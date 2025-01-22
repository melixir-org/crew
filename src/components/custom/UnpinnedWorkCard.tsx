import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Flame, Coins, Pin } from 'lucide-react';

export default function UnpinnedWorkCard({
    title,
    highlighted,
    handleWorkClick,
    handleIconClick,
}: {
    title: string;
    highlighted: boolean;
    handleWorkClick: () => void;
    handleIconClick: () => void;
}) {
    return (
        <Card
            className={`relative p-2 flex justify-between gap-2 cursor-pointer ${
                highlighted ? 'bg-white' : 'bg-black'
            }`}
            onClick={handleWorkClick}
        >
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            <div className="flex-grow">
                <h2
                    className={`text-sm h-6 font-semibold overflow-hidden ${
                        highlighted ? 'text-black' : 'text-white'
                    }`}
                >
                    {title}
                </h2>
                <div className="flex flex-wrap items-center justify-start gap-1">
                    <Badge className="bg-green-500 hover:bg-green-600 rounded-md">
                        Planning
                    </Badge>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 rounded-md">
                        Type
                    </Badge>
                    <Flame className="w-4 h-4 text-blue-500" />
                    <Coins className="w-4 h-4 text-blue-400" />
                </div>
            </div>
            <div
                className="p-1 self-center cursor-pointer hover:bg-gray-100 rounded-lg"
                onClick={e => {
                    e.stopPropagation();
                    handleIconClick();
                }}
            >
                <Pin className="h-5 w-5 text-gray-400" />
            </div>
        </Card>
    );
}
