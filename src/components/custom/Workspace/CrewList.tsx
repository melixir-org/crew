import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { crewUpvoteOrRemoveApi } from '@/lib/client-only-api';
import { usePageStore } from '@/provider/PageStore';
import { Crew } from '@/types/Crew';
import {
    CREW_VOTE_ACTION_REMOVE,
    CREW_VOTE_ACTION_UPVOTE,
    CrewVote,
    CrewVoteAction,
} from '@/types/CrewVote';
import { ChevronUp, MessageCircle, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const CrewList = ({
    items,
    handleItemClick,
}: {
    items: Crew[];
    handleItemClick: (id: string, workId: string) => void;
}) => {
    const {
        server: { user },
        setCrew,
    } = usePageStore(store => store);

    const searchParams = useSearchParams();
    const entry = searchParams.get('entry');

    async function handleVote(crewId: string, action: CrewVoteAction) {
        const data: CrewVote | null = await crewUpvoteOrRemoveApi({
            crewId,
            action,
        });

        if (data) {
            setCrew(crewId, crew => {
                // update existing crew vote or create new crew vote
                const votes = crew.votes ?? [];

                const index = votes.findIndex(cv => cv.id === data.id);
                if (index === -1) {
                    votes.push(data);
                } else {
                    votes[index] = data;
                }

                // update total votes
                if (action === CREW_VOTE_ACTION_UPVOTE) {
                    const currentTotalVotes = crew.total_votes?.[0]?.count ?? 0;
                    crew.total_votes = [{ count: currentTotalVotes + 1 }];
                }
                if (action === CREW_VOTE_ACTION_REMOVE) {
                    const currentTotalVotes = crew.total_votes?.[0]?.count ?? 1;
                    crew.total_votes = [{ count: currentTotalVotes - 1 }];
                }
            });
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {items.map(item => {
                const isUpvoted = item.votes?.find(
                    cv =>
                        cv.upvoted_by.id === user?.id && cv.removed_at === null
                );

                return (
                    <Card
                        key={item.id}
                        className={`border-none ${
                            entry === item.id
                                ? 'text-secondary-foreground'
                                : 'bg-secondary-dark-bg text-primary-foreground'
                        }`}
                    >
                        <CardContent className="p-4">
                            <div className="flex gap-2 items-start">
                                <div
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() =>
                                        handleVote(
                                            item.id,
                                            isUpvoted
                                                ? CREW_VOTE_ACTION_REMOVE
                                                : CREW_VOTE_ACTION_UPVOTE
                                        )
                                    }
                                >
                                    <button className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100">
                                        <ChevronUp
                                            className={`h-5 w-5 ${
                                                isUpvoted
                                                    ? 'text-green-500'
                                                    : 'text-muted-foreground'
                                            }`}
                                            strokeWidth={3}
                                        />
                                    </button>
                                    <span
                                        className={`text-xs ${
                                            isUpvoted
                                                ? 'text-green-500'
                                                : 'text-muted-foreground'
                                        }`}
                                    >
                                        {item.total_votes?.[0]?.count}
                                    </span>
                                </div>
                                <div
                                    className="flex-1 flex flex-col gap-1 cursor-pointer"
                                    onClick={() =>
                                        handleItemClick(
                                            item.id,
                                            item.root_work?.id ?? ''
                                        )
                                    }
                                >
                                    <div className="flex items-center justify-between">
                                        <h2
                                            className="text-lg font-medium truncate max-w-[calc(100%-2rem)]"
                                            title={item.title}
                                        >
                                            {item.title}
                                        </h2>
                                        <Avatar className="h-6 w-6">
                                            {item.created_by &&
                                                (item.created_by.avatar_url ? (
                                                    <AvatarImage
                                                        src={
                                                            item.created_by
                                                                .avatar_url
                                                        }
                                                    />
                                                ) : (
                                                    <AvatarFallback className="bg-gray-100 text-black">
                                                        <span className="text-xs">
                                                            {item.created_by.name
                                                                .split(' ')
                                                                .map(t =>
                                                                    t[0].toUpperCase()
                                                                )
                                                                .join('')
                                                                .slice(0, 2)}
                                                        </span>
                                                    </AvatarFallback>
                                                ))}
                                        </Avatar>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p
                                            className="text-sm text-muted-foreground truncate max-w-[70%]"
                                            title={'description'}
                                        >
                                            {'description'}
                                        </p>
                                        <div className="flex items-center space-x-3 ml-auto flex-shrink-0">
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 text-gray-500" />
                                                <span className="text-xs text-gray-500">
                                                    {
                                                        item.total_members?.[0]
                                                            ?.count
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <MessageCircle className="h-4 w-4 text-gray-500" />
                                                <span className="text-xs text-gray-500">
                                                    {
                                                        item.total_opinions?.[0]
                                                            ?.count
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default CrewList;
