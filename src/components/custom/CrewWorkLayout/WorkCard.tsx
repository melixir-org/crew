import { Flame, Coins, PinOff, Pin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Work } from '@/types/Work';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Assignment } from '@/types/Assignment';
import {
    CLOSED,
    DONE,
    PLANNING,
    READY,
    REVIEW,
    TO_DO,
    WIP,
} from '@/types/WorkStatus';
import { cn } from '@/lib/utils';

const WORK_STATUS_COLORS = {
    [TO_DO]: 'bg-slate-500',
    [READY]: 'bg-pink-500',
    [PLANNING]: 'bg-cyan-500',
    [WIP]: 'bg-blue-500',
    [REVIEW]: 'bg-amber-500',
    [DONE]: 'bg-green-500',
    [CLOSED]: 'bg-red-500',
};

export default function WorkCard({
    work,
    highlighted,
    pinned,
    hideIcon,
    handleClick,
    handlePin,
    handleUnpin,
}: {
    work: Work;
    highlighted: boolean;
    pinned: boolean;
    hideIcon?: boolean;
    handleClick: () => void;
    handlePin?: () => void;
    handleUnpin?: () => void;
}) {
    const assignments: Assignment[] = work.assignments ?? [];

    const activeAssignments = assignments.filter(a => a.unassigned_at === null);

    const assignee = activeAssignments[0];

    return (
        <Card
            className={`border-none relative p-2 flex justify-between gap-2 cursor-pointer ${
                highlighted ? 'bg-white' : 'bg-black'
            }`}
            onClick={handleClick}
        >
            {/* <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" /> */}
            <div className="flex-grow">
                <h2
                    className={`text-sm h-6 font-semibold overflow-hidden ${
                        highlighted ? 'text-black' : 'text-white'
                    }`}
                >
                    {work.title}
                </h2>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center justify-start gap-1">
                        <Badge
                            className={cn(
                                work.status
                                    ? WORK_STATUS_COLORS[work.status]
                                    : '',
                                'rounded-md'
                            )}
                        >
                            {work.status}
                        </Badge>
                        <Flame className="w-4 h-4 text-blue-500" />
                        <Coins className="w-4 h-4 text-blue-500" />
                    </div>
                    <Avatar className="h-6 w-6">
                        {assignee && (
                            <>
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-gray-100">
                                    <span className="text-xs">
                                        {assignee.user.email_id
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </span>
                                </AvatarFallback>
                            </>
                        )}
                    </Avatar>
                </div>
            </div>
            <div className="h-7 w-7 flex self-center">
                {hideIcon ||
                    (pinned ? (
                        <div
                            className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                            onClick={e => {
                                e.stopPropagation();
                                handleUnpin?.();
                            }}
                        >
                            <PinOff className="h-full w-full text-gray-400" />
                        </div>
                    ) : (
                        <div
                            className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                            onClick={e => {
                                e.stopPropagation();
                                handlePin?.();
                            }}
                        >
                            <Pin className="h-full w-full text-gray-400" />
                        </div>
                    ))}
            </div>
        </Card>
    );
}
