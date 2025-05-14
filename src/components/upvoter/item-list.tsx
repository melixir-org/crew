'use client';

import type React from 'react';
import { useState } from 'react';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ArrowUp,
    CheckCircle,
    Loader2,
    RefreshCw,
    XCircle,
} from 'lucide-react';
import UserItemCard from './user-item';
import type { Item } from '@/types/Upvoter';
import { CreateItemCard } from './create-item';

const REFRESHING = 'refreshing';

export default function ItemList({
    items: i,
    recentVotes: rc,
    score: sc,
    userItem: ui,
}: {
    items: Item[];
    recentVotes: number;
    score: number;
    userItem: Item | null;
}) {
    const [items, setItems] = useState<Item[]>(i);
    const [userItem, setUserItem] = useState<Item | null>(ui);

    const [recentVotes, setRecentVotes] = useState<number>(rc);
    const remainingVotes = Math.max(0, 2 - recentVotes);

    const [score, setScore] = useState<number>(sc);

    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleUpvote = async (item: Item, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the card click
        setErrorMessage(null); // Clear any previous errors

        try {
            setIsLoading(item.id);
            // Simulate API call to get the URL
            const response = await fetch(`/api/upvote?id=${item.id}`, {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to upvote');
            }

            // Open the URL with noreferrer to prevent sending referrer information
            window.open(data.url, '_blank', 'noreferrer,noopener');
        } catch (error) {
            // Display error message to user and mark item as failed
            setErrorMessage(
                error instanceof Error ? error.message : 'An error occurred'
            );
        } finally {
            setIsLoading(null);
        }
    };

    // Function to handle reload
    const handleRefresh = () => {
        setIsLoading(REFRESHING);
        setErrorMessage(null);

        // Simulate API fetch delay
        setTimeout(() => {
            // In a real app, you would fetch fresh data here
            setItems([...i].sort(() => Math.random() - 0.5));
            setIsLoading(null);
        }, 1000);
    };

    // Function to update user's item
    const handleUpdateUserItem = (updatedItem: Item) => {
        // In a real app, you would make an API call to update the item
        setUserItem(updatedItem);
    };

    // Function to create a new user item
    const handleCreateUserItem = (newItem: Omit<Item, 'id' | 'upvotes'>) => {
        // In a real app, you would make an API call to create the item and get an ID
        const createdItem: Item = {
            ...newItem,
            id: Date.now().toString(), // Generate a temporary ID (in production, this would come from the backend)
            upvotes: 0,
        };
        setUserItem(createdItem);
    };

    return (
        <div className="space-y-4 text-gray-900">
            <div className="mb-6">
                {userItem ? (
                    <UserItemCard
                        item={userItem}
                        onUpdate={handleUpdateUserItem}
                    />
                ) : (
                    <CreateItemCard onCreateItem={handleCreateUserItem} />
                )}
            </div>

            <div className="border-t border-border my-6"></div>

            <h2 className="text-lg font-semibold mb-3 text-gray-900 flex items-center justify-between">
                <span>Upvote others to get Upvoted</span>
                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center">
                    Score: <span className="font-bold ml-1">{score}</span>
                </span>
            </h2>

            <div className="flex justify-between items-center mb-4 p-3 bg-muted rounded-lg">
                <div className="font-medium text-gray-900">
                    Remaining votes:{' '}
                    <span className="text-primary font-bold">
                        {remainingVotes}
                    </span>
                </div>
                <Button
                    onClick={handleRefresh}
                    variant="outline"
                    size="sm"
                    disabled={isLoading === REFRESHING}
                >
                    <RefreshCw
                        className={`h-4 w-4 mr-2 ${
                            isLoading === REFRESHING ? 'animate-spin' : ''
                        }`}
                    />
                    Refresh
                </Button>
            </div>

            {errorMessage && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-lg mb-4">
                    {errorMessage}
                </div>
            )}

            <div className="grid gap-4">
                {items.map(item => (
                    <Card
                        key={item.id}
                        className="hover:shadow-md transition-shadow bg-white"
                    >
                        <CardHeader className="py-4">
                            <div className="flex justify-between items-start gap-4">
                                <CardTitle className="truncate max-w-[80%] text-gray-900">
                                    {item.title}
                                </CardTitle>
                                {isLoading === item.id ? (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled
                                        className="text-primary shrink-0"
                                    >
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Loading
                                    </Button>
                                ) : item.upvoted === true ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={e => {
                                            e.stopPropagation();
                                            window.open(
                                                item.url,
                                                '_blank',
                                                'noreferrer,noopener'
                                            );
                                        }}
                                        className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700 shrink-0"
                                    >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Visit Again
                                    </Button>
                                ) : item.upvoted === false ? (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                                    >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Failed
                                    </Button>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={e => handleUpvote(item, e)}
                                        // disabled={remainingVotes <= 0}
                                        className="text-primary hover:text-primary-foreground hover:bg-primary shrink-0"
                                    >
                                        <ArrowUp className="h-4 w-4 mr-2" />
                                        Upvote
                                    </Button>
                                )}
                            </div>
                            <CardDescription className="line-clamp-2 text-gray-500">
                                {item.subtitle}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
