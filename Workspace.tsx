'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePageStore } from '@/provider/PageStore';
import { CREW_HOME_ROUTE, WORK_HOME_ROUTE } from '@/app/routes';
import { CREW, WORK } from '@/lib/constants';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';

function Workspace({ ids }: { ids: string[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { crews, works } = usePageStore(store => store.server);

    const pageIndex = searchParams.get('page_index') || '0';
    const pageSize = searchParams.get('page_size') || '10';
    const type = searchParams.get('type') || WORK;
    const entry = searchParams.get('entry');

    const handleTypeChange = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('type', type);
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page_index', pageIndex.toString());
        params.set('page_size', pageSize.toString());
        router.replace(`${pathname}?${params.toString()}`);
    };

    const workItems = ids.map(id => works[id]);
    const crewItems = ids.map(id => crews[id]);

    const handleItemClick = (id: string, workId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('entry', id);
        params.set('show', workId);
        params.set('h', workId);
        if (type === WORK) {
            params.set('panel', 'h');
            router.push(`${WORK_HOME_ROUTE.pathname}?${params.toString()}`);
        } else {
            params.set('panel', 'm');
            router.push(`${CREW_HOME_ROUTE.pathname}?${params.toString()}`);
        }
    };

    const handleCreateCrewClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('create_mode', 'crew');
        router.push(`/workspace/crew?${params.toString()}`);
    };

    // Type guard to check if it's a Crew
    const isCrew = (item: Work | Crew): item is Crew => {
        return (item as Crew).root_work !== undefined;
    };

    return (
        <div className="relative min-h-screen">
            {/* "Create a Crew" button positioned at the top-left */}
            <button
                onClick={handleCreateCrewClick}
                className="absolute top-4 left-4 w-96 h-10 bg-white text-black font-bold rounded-md shadow-md flex items-center justify-center space-x-2"
            >
                <span className="text-black text-3xl font-bold">+</span>
                <span className="font-bold">Create a Crew</span>
            </button>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <h1 className="text-3xl font-bold mb-6">{type} list</h1>
                <Tabs
                    value={type}
                    onValueChange={value => handleTypeChange(value)}
                    className="w-full"
                >
                    <TabsList className="bg-zinc-900 border border-zinc-800">
                        {[CREW, WORK].map(t => (
                            <TabsTrigger
                                key={t}
                                value={t}
                                className="data-[state=active]:bg-zinc-800"
                            >
                                {t}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <ul className="space-y-4">
                    {(type === WORK ? workItems : crewItems).map(item => (
                        <li key={item.id}>
                            <Card
                                className={`cursor-pointer transition-colors ${
                                    entry === item.id
                                        ? 'bg-secondary text-secondary-foreground'
                                        : 'bg-primary text-primary-foreground'
                                }`}
                                onClick={() => {
                                    const workId =
                                        type === CREW && isCrew(item)
                                            ? item.root_work!.id
                                            : item.id;

                                    handleItemClick(item.id, workId);
                                }}
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
            </div>
        </div>
    );
}

export default Workspace;
