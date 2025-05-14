'use client';

import type React from 'react';

import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2, Link, Save, ThumbsUp } from 'lucide-react';
import type { Item } from '@/types/Upvoter';

interface UserItemProps {
    item: Item;
    onUpdate: (updatedItem: Item) => void;
}

export default function UserItemCard({ item, onUpdate }: UserItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState<Item>(item);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onUpdate(editedItem);
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedItem(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader className="py-4">
                <div className="flex justify-between items-center">
                    <div>
                        {isEditing ? (
                            <div className="space-y-2">
                                <Label
                                    htmlFor="title"
                                    className="text-gray-900"
                                >
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={editedItem.title}
                                    onChange={handleChange}
                                />
                            </div>
                        ) : (
                            <CardTitle className="text-gray-900">
                                {item.title}
                            </CardTitle>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center text-primary bg-primary/10 px-3 py-1 rounded-full">
                            <span className="font-medium">{item.upvotes}</span>
                            <span className="ml-1 text-xs">upvotes</span>
                        </div>
                        {isEditing ? (
                            <Button
                                size="sm"
                                onClick={handleSave}
                                className="gap-1"
                            >
                                <Save className="h-4 w-4" />
                                Save
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleEdit}
                                className="gap-1"
                            >
                                <Edit2 className="h-4 w-4" />
                                Edit
                            </Button>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <div className="space-y-4">
                        <div className="mt-4 space-y-2">
                            <Label htmlFor="subtitle" className="text-gray-900">
                                Subtitle
                            </Label>
                            <Input
                                id="subtitle"
                                name="subtitle"
                                value={editedItem.subtitle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="url" className="text-gray-900">
                                URL
                            </Label>
                            <Input
                                id="url"
                                name="url"
                                value={editedItem.url}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <CardDescription className="text-gray-500">
                            {item.subtitle}
                        </CardDescription>
                    </>
                )}
            </CardHeader>

            {!isEditing && (
                <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link className="h-4 w-4 mr-2" />
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-primary hover:underline truncate"
                        >
                            {item.url}
                        </a>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
