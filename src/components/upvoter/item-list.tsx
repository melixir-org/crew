'use client';

import type React from 'react';
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ArrowUp,
    CheckCircle,
    Loader2,
    Minus,
    PackageOpen,
    RefreshCw,
    ThumbsDown,
    ThumbsUp,
    XCircle,
} from 'lucide-react';
import UserItemCard from './user-item';
import type { Item, UpvoteData, UpvoterData } from '@/types/Upvoter';
import { CreateItemCard } from './create-item';
import { User } from '@supabase/supabase-js';
import { getUpvoterItemsApi, upvoteItemApi } from '@/lib/client-only-api';

const REFRESHING = 'refreshing';

export default function ItemList({
    items: i,
    recentVotes: rc,
    score: sc,
    userItem: ui,
    user,
}: {
    items: Item[];
    recentVotes: number;
    score: number;
    userItem: Item | null;
    user: User | null;
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
            const {
                data,
                error,
            }: {
                data: UpvoteData | null;
                error: unknown;
            } = await upvoteItemApi({
                itemId: item.id,
            });

            if (error) {
                throw error;
            }

            if (data) {
                setRecentVotes(data.user_recent_votes);
                setScore(data.user_score);
                setItems(i => {
                    const index = i.findIndex(t => t.id === item.id);
                    if (index === -1) {
                        return i;
                    }

                    const updatedItem = i[index];
                    updatedItem.upvoted = true;

                    return [...i];
                });

                // Open the URL with noreferrer to prevent sending referrer information
                window.open(data.url, '_blank', 'noreferrer,noopener');
            }
        } catch (error) {
            // Display error message to user and mark item as failed

            console.log(error);

            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else if (
                typeof error === 'object' &&
                error !== null &&
                'message' in error
            ) {
                setErrorMessage(
                    String((error as { message: unknown }).message)
                );
            } else {
                setErrorMessage('Failed to upvote');
            }
        } finally {
            setIsLoading(null);
        }
    };

    const handleRefresh = async () => {
        setIsLoading(REFRESHING);
        setErrorMessage(null);

        const { data }: { data: UpvoterData | null } =
            await getUpvoterItemsApi();

        if (data) {
            setItems(data.items);
            setRecentVotes(data.user_recent_votes);
            setScore(data.user_score);
        }

        setIsLoading(null);
    };

    const getScoreDisplay = (score: number) => {
        if (score > 0) {
            return {
                bgColor: 'bg-green-100',
                textColor: 'text-green-600',
                icon: <ThumbsUp className="h-4 w-4 mr-2" />,
            };
        } else if (score < 0) {
            return {
                bgColor: 'bg-red-100',
                textColor: 'text-red-600',
                icon: <ThumbsDown className="h-4 w-4 mr-2" />,
            };
        } else {
            return {
                bgColor: 'bg-gray-100',
                textColor: 'text-gray-600',
                icon: <Minus className="h-4 w-4 mr-2" />,
            };
        }
    };

    const scoreDisplay = getScoreDisplay(score);

    return (
        <div className="space-y-4 text-gray-900">
            <div className="mb-6">
                {userItem ? (
                    <UserItemCard item={userItem} setUserItem={setUserItem} />
                ) : (
                    <CreateItemCard setUserItem={setUserItem} />
                )}
            </div>

            <div className="border-t border-border my-6"></div>

            <h2 className="text-lg font-semibold mb-3 text-gray-900 flex items-center justify-between">
                <span>Upvote others to get Upvoted</span>
                <span
                    className={`text-sm ${scoreDisplay.bgColor} ${scoreDisplay.textColor} px-3 py-1 rounded-full flex items-center`}
                >
                    {scoreDisplay.icon}
                    Your Score: <span className="font-bold ml-1">{score}</span>
                </span>
            </h2>

            <div className="flex justify-between items-center mb-4 p-3 rounded-lg">
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

            {items.length === 0 ? (
                <Card className="bg-white border-dashed border-2 border-gray-200">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                            <PackageOpen className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="text-xl mb-2 text-gray-900">
                            Nice Job!
                        </CardTitle>
                        <CardDescription className="text-gray-500 max-w-md mb-6">
                            There are currently no items for you to upvote.
                            Check back after 1 hour or refresh to see if new
                            items become available.
                        </CardDescription>
                        <Button
                            onClick={handleRefresh}
                            className="gap-2"
                            disabled={isLoading === REFRESHING}
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${
                                    isLoading === REFRESHING
                                        ? 'animate-spin'
                                        : ''
                                }`}
                            />
                            Refresh
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {items.map(item => (
                        <Card
                            key={item.id}
                            className="hover:shadow-md transition-shadow bg-white"
                        >
                            <CardHeader className="py-4">
                                <div className="flex justify-between items-center gap-4">
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
                                            Upvoted, Visit Again
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
            )}
        </div>
    );
}
