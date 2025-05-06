'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
// import { formatDistanceToNow } from 'date-fns'
import { MessageSquareReply } from 'lucide-react';

// Types for our comments
interface Comment {
    id: string;
    author: {
        name: string;
        avatar?: string;
        initials: string;
        isAnonymous?: boolean;
    };
    content: string;
    createdAt: Date;
    replies?: Comment[];
    replyingTo?: {
        id: string;
        authorName: string;
    };
}

export default function Comments() {
    // Sample initial comments
    const [comments, setComments] = useState<Comment[]>([
        {
            id: '1',
            author: {
                name: 'Sarah Johnson',
                avatar: '/placeholder.svg?height=40&width=40',
                initials: 'SJ',
            },
            content:
                'This is really insightful! Thanks for sharing your thoughts on this topic.',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
            replies: [
                {
                    id: '1-1',
                    author: {
                        name: 'Anonymous User',
                        initials: 'AU',
                        isAnonymous: true,
                    },
                    content:
                        'I agree! The insights shared here are very valuable.',
                    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
                    replyingTo: {
                        id: '1',
                        authorName: 'Sarah Johnson',
                    },
                },
            ],
        },
        {
            id: '2',
            author: {
                name: 'Michael Chen',
                avatar: '/placeholder.svg?height=40&width=40',
                initials: 'MC',
            },
            content:
                'I have a different perspective on this. I think we should also consider the environmental impact.',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            replies: [],
        },
    ]);

    const [newComment, setNewComment] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [isReplyAnonymous, setIsReplyAnonymous] = useState(false);

    // Function to flatten comments and replies into a single array for display
    const getAllComments = () => {
        let allComments: Comment[] = [];

        comments.forEach(comment => {
            allComments.push(comment);

            if (comment.replies && comment.replies.length > 0) {
                allComments = [...allComments, ...comment.replies];
            }
        });

        // Sort by creation date (newest first)
        return allComments.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
    };

    const handleSubmitComment = () => {
        if (!newComment.trim()) return;

        setIsSubmitting(true);

        // Simulate API call delay
        setTimeout(() => {
            const comment: Comment = {
                id: Date.now().toString(),
                author: {
                    name: isAnonymous ? 'Anonymous User' : 'Current User', // In a real app, this would come from auth
                    initials: isAnonymous ? 'AU' : 'CU',
                    isAnonymous: isAnonymous,
                },
                content: newComment,
                createdAt: new Date(),
                replies: [],
            };

            setComments(prev => [...prev, comment]);
            setNewComment('');
            setIsAnonymous(false);
            setIsSubmitting(false);
        }, 500);
    };

    const handleSubmitReply = (parentId: string) => {
        if (!replyContent.trim()) return;

        setIsSubmitting(true);

        // Find the parent comment to get its author name
        const parentComment = comments.find(c => c.id === parentId);
        if (!parentComment) return;

        // Simulate API call delay
        setTimeout(() => {
            const reply: Comment = {
                id: `${parentId}-${Date.now()}`,
                author: {
                    name: isReplyAnonymous ? 'Anonymous User' : 'Current User',
                    initials: isReplyAnonymous ? 'AU' : 'CU',
                    isAnonymous: isReplyAnonymous,
                },
                content: replyContent,
                createdAt: new Date(),
                replyingTo: {
                    id: parentId,
                    authorName: parentComment.author.name,
                },
            };

            setComments(prev =>
                prev.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: [...(comment.replies || []), reply],
                        };
                    }
                    return comment;
                })
            );

            setReplyContent('');
            setReplyingTo(null);
            setIsReplyAnonymous(false);
            setIsSubmitting(false);
        }, 500);
    };

    const flattenedComments = getAllComments();
    const totalComments = flattenedComments.length;

    return (
        <Card className="w-full max-w-3xl bg-secondary-dark-bg text-white border-none">
            <CardHeader>
                <CardTitle className="text-base font-bold text-white">
                    Comments ({totalComments})
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {flattenedComments.map(comment => (
                    <div key={comment.id} className="flex gap-4 pb-2 border-b">
                        <Avatar className="h-10 w-10 text-black">
                            {comment.author.avatar &&
                            !comment.author.isAnonymous ? (
                                <AvatarImage
                                    src={
                                        comment.author.avatar ||
                                        '/placeholder.svg'
                                    }
                                    alt={comment.author.name}
                                />
                            ) : null}
                            <AvatarFallback>
                                {comment.author.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 flex-1 text-white">
                            {comment.replyingTo && (
                                <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                                    <MessageSquareReply className="h-3 w-3" />
                                    <span>
                                        Replying to{' '}
                                        <span className="font-medium">
                                            {comment.replyingTo.authorName}
                                        </span>
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    {comment.author.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {/* {formatDistanceToNow(comment.createdAt, {
                                        addSuffix: true,
                                    })} */}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {comment.content}
                            </p>
                            <Button
                                variant="link"
                                size="sm"
                                className="text-xs mt-2 text-white"
                                onClick={() =>
                                    setReplyingTo(
                                        replyingTo === comment.id
                                            ? null
                                            : comment.id
                                    )
                                }
                            >
                                {replyingTo === comment.id
                                    ? 'Cancel Reply'
                                    : 'Reply'}
                            </Button>

                            {/* Reply form */}
                            {/* {replyingTo === comment.id && (
                                <div className="mt-4 flex gap-4 w-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                            {isReplyAnonymous ? 'AU' : 'CU'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <Textarea
                                            placeholder="Write a reply..."
                                            value={replyContent}
                                            onChange={e =>
                                                setReplyContent(e.target.value)
                                            }
                                            className="resize-none"
                                            rows={2}
                                        />
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`reply-anonymous-${comment.id}`}
                                                    checked={isReplyAnonymous}
                                                    onChange={() =>
                                                        setIsReplyAnonymous(
                                                            !isReplyAnonymous
                                                        )
                                                    }
                                                    className="rounded"
                                                />
                                                <label
                                                    htmlFor={`reply-anonymous-${comment.id}`}
                                                    className="text-sm"
                                                >
                                                    Post anonymously
                                                </label>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    handleSubmitReply(
                                                        comment.id
                                                    )
                                                }
                                                disabled={
                                                    !replyContent.trim() ||
                                                    isSubmitting
                                                }
                                            >
                                                {isSubmitting
                                                    ? 'Posting...'
                                                    : 'Post Reply'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    </div>
                ))}

                {comments.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                        No comments yet. Be the first to comment!
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <div className="flex gap-4 w-full">
                    <Avatar className="h-10 w-10 text-black">
                        <AvatarFallback>
                            {isAnonymous ? 'AU' : 'CU'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                        <Textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            className="resize-none"
                            rows={3}
                        />
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="anonymous"
                                checked={isAnonymous}
                                onChange={() => setIsAnonymous(!isAnonymous)}
                                className="rounded"
                            />
                            <label htmlFor="anonymous" className="text-sm">
                                Post anonymously
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end w-full">
                    <Button
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim() || isSubmitting}
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
