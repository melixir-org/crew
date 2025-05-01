import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Crew } from '@/types/Crew';
import { useSearchParams } from 'next/navigation';

const CrewList = ({
    items,
    handleItemClick,
}: {
    items: Crew[];
    handleItemClick: (id: string, workId: string) => void;
}) => {
    const searchParams = useSearchParams();
    const entry = searchParams.get('entry');

    return (
        <ul className="flex flex-col gap-2 overflow-y-auto scrollbar-none">
            {items.map(item => (
                <li key={item.id}>
                    <Card
                        className={`border-none relative p-4 flex justify-between gap-2 cursor-pointer items-center ${
                            entry === item.id
                                ? 'text-secondary-foreground'
                                : 'bg-secondary-dark-bg text-primary-foreground'
                        }`}
                        onClick={() =>
                            handleItemClick(item.id, item.root_work?.id ?? '')
                        }
                    >
                        <div className="flex-grow">
                            <h2 className="text-xl font-semibold">
                                {item.title}
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {'description'}
                            </p>
                        </div>
                        <Avatar className="h-6 w-6">
                            {item.created_by &&
                                (item.created_by.avatar_url ? (
                                    <AvatarImage
                                        src={item.created_by.avatar_url}
                                    />
                                ) : (
                                    <AvatarFallback className="bg-gray-100">
                                        <span className="text-xs">
                                            {item.created_by.name
                                                .split(' ')
                                                .map(t => t[0].toUpperCase())
                                                .join('')
                                                .slice(0, 2)}
                                        </span>
                                    </AvatarFallback>
                                ))}
                        </Avatar>
                    </Card>
                </li>
            ))}
        </ul>
    );
};

export default CrewList;
