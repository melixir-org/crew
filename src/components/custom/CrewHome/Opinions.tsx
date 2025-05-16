import { useEffect, useRef, useState } from 'react';
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
import { MessageSquareReply, User, X } from 'lucide-react';
import { usePageStore } from '@/provider/PageStore';
import { usePathname } from 'next/navigation';
import { extractWorkId } from '@/lib/utils';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { Opinion } from '@/types/Opinion';
import { addOpinionApi } from '@/lib/client-only-api';

const ANONYMOUS_USER = 'Anonymous User';

export default function Opinions({
    pageLoadTimestamp,
}: {
    pageLoadTimestamp: string;
}) {
    const {
        server: { crews, works, user },
        setCrew,
    } = usePageStore(store => store);

    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);

    const work: Work = works[workId];

    const crewId: string = work.crew?.id ?? '';

    const crew: Crew = crews[crewId];

    const opinions: Opinion[] = crew.opinions ?? [];

    const [opinionText, setOpinionText] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [replyOf, setReplyOf] = useState<Opinion | null>(null);

    const [isSticky, setIsSticky] = useState(false);

    // const commentSectionRef = useRef<HTMLDivElement>(null);
    // const commentFormRef = useRef<HTMLDivElement>(null);
    const opinionsContainerRef = useRef<HTMLDivElement>(null);
    // const scrollButtonRef = useRef<HTMLButtonElement>(null);

    // Function to check if we should make the comment form sticky
    useEffect(() => {
        const handleScroll = () => {
            if (
                // !commentSectionRef.current ||
                // !commentFormRef.current ||
                !opinionsContainerRef.current
            )
                return;

            // const commentSectionRect =
            //     commentSectionRef.current.getBoundingClientRect();
            // const commentFormRect =
            //     commentFormRef.current.getBoundingClientRect();
            const commentsContainerRect =
                opinionsContainerRef.current.getBoundingClientRect();

            // Calculate the position where the form would naturally be
            const formNaturalBottom = commentsContainerRect.bottom;

            // If the natural bottom is above the viewport, make it sticky
            // If it's in view, keep it in the normal flow
            if (formNaturalBottom < window.innerHeight) {
                setIsSticky(false);
            } else {
                setIsSticky(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleSubmitComment() {
        setIsLoading(true);
        addOpinionApi({
            crewId,
            anonymous,
            data: opinionText,
            replyOf: replyOf?.id ?? null,
            createdBy: user?.id ?? '',
        })
            .then(opinion => {
                setCrew(crewId, crew => {
                    crew.opinions = [...opinions, opinion];
                });
                setOpinionText('');
                setAnonymous(false);
                setReplyOf(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        // TODO: <div className="relative">
        <Card className="w-full bg-secondary-dark-bg text-white border-none">
            <CardHeader>
                <CardTitle className="text-base font-bold text-white">
                    Opinions ({opinions.length})
                </CardTitle>
            </CardHeader>
            <div ref={opinionsContainerRef}>
                <CardContent className="space-y-2">
                    {opinions.map(o => (
                        <div
                            key={o.id}
                            className="flex gap-4  pb-2 border-gray-700"
                        >
                            {o.anonymous ? (
                                <div className="flex items-center justify-center h-8 w-8">
                                    <User />
                                </div>
                            ) : (
                                <Avatar className="h-8 w-8">
                                    {o.created_by.avatar_url ? (
                                        <AvatarImage
                                            src={o.created_by.avatar_url}
                                        />
                                    ) : (
                                        <AvatarFallback className="bg-gray-100 text-black">
                                            <span className="text-xs">
                                                {o.created_by.name
                                                    .split(' ')
                                                    .map(t =>
                                                        t[0].toUpperCase()
                                                    )
                                                    .join('')
                                                    .slice(0, 2)}
                                            </span>
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                            )}
                            <div className="space-y-1 flex-1 text-white">
                                {o.reply_of && (
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                                        <MessageSquareReply className="h-3 w-3" />
                                        <span>
                                            Replying to{' '}
                                            <span className="font-medium">
                                                {o.reply_of.anonymous
                                                    ? ANONYMOUS_USER
                                                    : o.reply_of.created_by
                                                          .name}
                                            </span>
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                            {o.anonymous
                                                ? ANONYMOUS_USER
                                                : o.created_by.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {/* {formatDistanceToNow(
                                            comment.createdAt,
                                            { addSuffix: true }
                                        )} */}
                                        </span>
                                    </div>
                                    <div>
                                        {o.created_by.id === user?.id && (
                                            <Button
                                                variant="link"
                                                size="sm"
                                                className="text-xs text-white"
                                                onClick={() => setReplyOf(o)}
                                                disabled
                                            >
                                                Edit
                                            </Button>
                                        )}
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="text-xs text-white"
                                            onClick={() => setReplyOf(o)}
                                        >
                                            Reply
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground whitespace-pre-line">
                                    {o.data}
                                </p>
                            </div>
                        </div>
                    ))}
                    {opinions.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                            No opinions yet. Be the first to give an opinion!
                        </div>
                    )}
                </CardContent>
            </div>
            <div
                className={
                    isSticky
                        ? 'sticky bottom-0 bg-secondary-dark-bg border-t border-gray-700 z-10 rounded-b-md'
                        : ''
                }
            >
                <CardFooter className="flex flex-col space-y-2 mt-2">
                    {replyOf && (
                        <div className="w-full flex items-center justify-between bg-muted text-black p-2 rounded-md">
                            <div className="flex items-center gap-1 text-sm">
                                <MessageSquareReply className="h-4 w-4" />
                                <span>
                                    Replying to{' '}
                                    <span className="font-medium">
                                        {replyOf.anonymous
                                            ? ANONYMOUS_USER
                                            : replyOf.created_by.name}
                                    </span>
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    setReplyOf(null);
                                }}
                                className="h-6 w-6"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                    <div className="flex gap-4 w-full">
                        {anonymous ? (
                            <div className="flex items-center justify-center h-8 w-8">
                                <User />
                            </div>
                        ) : (
                            <Avatar className="h-8 w-8">
                                {user?.user_metadata.avatar_url ? (
                                    <AvatarImage
                                        src={user.user_metadata.avatar_url}
                                    />
                                ) : (
                                    <AvatarFallback className="bg-gray-100 text-black">
                                        <span className="text-xs">
                                            {user?.user_metadata.name
                                                .split(' ')
                                                .map((t: string) =>
                                                    t[0].toUpperCase()
                                                )
                                                .join('')
                                                .slice(0, 2)}
                                        </span>
                                    </AvatarFallback>
                                )}
                            </Avatar>
                        )}
                        <div className="flex-1 space-y-2">
                            <Textarea
                                spellCheck={true}
                                placeholder="Write an opinion..."
                                value={opinionText}
                                onChange={e => setOpinionText(e.target.value)}
                                className="border-gray-700"
                                rows={3}
                            />
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="anonymous"
                                    checked={anonymous}
                                    onChange={() => setAnonymous(!anonymous)}
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
                            disabled={!opinionText.trim() || isLoading}
                        >
                            {isLoading
                                ? 'Posting...'
                                : replyOf
                                ? 'Post Reply'
                                : 'Post Opinion'}
                        </Button>
                    </div>
                </CardFooter>
            </div>
        </Card>
        // </div>
    );
}
