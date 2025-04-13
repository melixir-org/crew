import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Work } from '@/types/Work';
import { useSearchParams } from 'next/navigation';

const WorkList = ({
    items,
    handleItemClick,
}: {
    items: Work[];
    handleItemClick: (id: string, workId: string) => void;
}) => {
    const searchParams = useSearchParams();
    const entry = searchParams.get('entry');

    return (
        <ul className="flex flex-col gap-2 overflow-y-auto scrollbar-none">
            {items.map(item => (
                <li key={item.id}>
                    <Card
                        className={`border-none relative p-2 flex justify-between gap-2 cursor-pointer ${
                            entry === item.id
                                ? 'text-secondary-foreground'
                                : 'bg-secondary-dark-bg text-primary-foreground'
                        }`}
                        onClick={() => handleItemClick(item.id, item.id)}
                    >
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p
                                className={
                                    entry === item.id
                                        ? 'text-secondary-foreground'
                                        : 'text-primary-foreground'
                                }
                            ></p>
                        </CardContent>
                    </Card>
                </li>
            ))}
        </ul>
    );
};

export default WorkList;
