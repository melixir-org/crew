import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { usePageStore } from '@/provider/PageStore';
import { Crew } from '@/types/Crew';
import { ChevronUp, MessageCircle, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const CrewList = ({
    items,
    handleItemClick,
}: {
    items: Crew[];
    handleItemClick: (id: string, workId: string) => void;
}) => {
    const { user } = usePageStore(store => store.server);

    const searchParams = useSearchParams();
    const entry = searchParams.get('entry');

    return (
        <div className="flex flex-col gap-2">
            {items.map(item => {
                const isUpvoted = item.crew_votes?.find(
                    cv =>
                        cv.upvoted_by.id === user?.id && cv.removed_at === null
                );

                return (
                    <Card
                        key={item.id}
                        className={`border-none cursor-pointer ${
                            entry === item.id
                                ? 'text-secondary-foreground'
                                : 'bg-secondary-dark-bg text-primary-foreground'
                        }`}
                    >
                        <CardContent className="p-4">
                            <div className="flex gap-2 items-start">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="flex items-center justify-center h-8 w-8 rounded-full focus:outline-none"
                                        // onClick={e => handleLike(item.id, e)}
                                    >
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
                                        {item.total_crew_votes?.[0]?.count}
                                    </span>
                                </div>
                                <div
                                    className="flex-1 flex flex-col gap-1"
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
                                                    <AvatarFallback className="bg-gray-100">
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
