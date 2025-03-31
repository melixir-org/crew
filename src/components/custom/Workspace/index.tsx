'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePageStore } from '@/provider/PageStore';
import {
    CREW_HOME_ROUTE,
    WORK_HOME_ROUTE,
    WORKSPACE_ROUTE,
} from '@/app/routes';
import { CREW, NEW, WORK } from '@/lib/constants';
import WorkList from './WorkList';
import CrewList from './CrewList';
import { Button } from '@/components/ui/button';

function Workspace({ ids }: { ids: string[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { crews, works } = usePageStore(store => store.server);

    const pageIndex = searchParams.get('page_index') || '0';
    const pageSize = searchParams.get('page_size') || '10';
    const type = searchParams.get('type') || WORK;

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
        params.set('pin', workId);
        if (type === WORK) {
            params.set('panel', 'hierarchy');
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${workId}${
                    WORK_HOME_ROUTE.pathname
                }?${params.toString()}`
            );
        } else {
            params.set('panel', 'manage');
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${workId}${
                    CREW_HOME_ROUTE.pathname
                }?${params.toString()}`
            );
        }
    };

    const handleCreateCrew = () => {
        router.push(
            `${WORKSPACE_ROUTE.pathname}/${NEW}${
                CREW_HOME_ROUTE.pathname
            }?${searchParams.toString()}`
        );
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Button className="bg-white text-black" onClick={handleCreateCrew}>
                Create a Crew
            </Button>
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
            {type === WORK && (
                <WorkList items={workItems} handleItemClick={handleItemClick} />
            )}
            {type === CREW && (
                <CrewList items={crewItems} handleItemClick={handleItemClick} />
            )}
        </div>
    );
}

export default Workspace;
