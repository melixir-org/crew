'use client';

import type React from 'react';

import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Plus } from 'lucide-react';
import type { Item } from '@/types/Upvoter';
import { addUpvoterItem } from '@/lib/client-only-api';

interface CreateItemCardProps {
    setUserItem: (item: Item) => void;
}

export function CreateItemCard({ setUserItem }: CreateItemCardProps) {
    const [newItem, setNewItem] = useState({
        title: '',
        subtitle: '',
        url: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!newItem.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!newItem.subtitle.trim()) {
            newErrors.subtitle = 'Subtitle is required';
        }

        if (!newItem.url.trim()) {
            newErrors.url = 'URL is required';
        } else if (!/^https?:\/\/.+/.test(newItem.url)) {
            newErrors.url = 'URL must start with http:// or https://';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);

            try {
                const response = await addUpvoterItem(newItem);
                setUserItem(response);
            } catch (error) {
                console.error('Error creating item:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Card className="mb-8 border-primary/20 bg-primary/5">
            <form onSubmit={handleSubmit}>
                <CardHeader className="py-4">
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Plus className="h-5 w-5 text-primary" />
                        Add Your Product (for others to Upvote)
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-900">
                            Title
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            value={newItem.title}
                            onChange={handleChange}
                            placeholder="Product name"
                            className={errors.title ? 'border-destructive' : ''}
                        />
                        {errors.title && (
                            <p className="text-xs text-destructive">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subtitle" className="text-gray-900">
                            Subtitle
                        </Label>
                        <Input
                            id="subtitle"
                            name="subtitle"
                            value={newItem.subtitle}
                            onChange={handleChange}
                            placeholder="A brief description"
                            className={
                                errors.subtitle ? 'border-destructive' : ''
                            }
                        />
                        {errors.subtitle && (
                            <p className="text-xs text-destructive">
                                {errors.subtitle}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="url" className="text-gray-900">
                            URL
                        </Label>
                        <Input
                            id="url"
                            name="url"
                            value={newItem.url}
                            onChange={handleChange}
                            placeholder="Product Hunt or Peerlist URL"
                            className={errors.url ? 'border-destructive' : ''}
                        />
                        {errors.url && (
                            <p className="text-xs text-destructive">
                                {errors.url}
                            </p>
                        )}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Submit...
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
