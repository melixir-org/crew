'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CREW_HOME_ROUTE, WORK_HOME_ROUTE } from '@/app/routes';
import { getCrews } from '@/lib/client-only-api/crew';
import { useQuery } from '@tanstack/react-query';
import { usePageStore } from '@/provider/PageStore';
import { Crew } from '@/types/Crew';

function Workspace() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const crewsFromStore = usePageStore(state => state.crews);
    const addCrews = usePageStore(state => state.addCrews);
    const [currentPageIds, setCurrentPageIds] = useState<string[]>([]);

    const handleTypeChange = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('type', type);
        router.replace(`${pathname}?${params.toString()}`);
    };

    const pageIndex = searchParams.get('page_index') || '0';
    const pageSize = searchParams.get('page_size') || '10';
    const type = searchParams.get('type') || 'work';

    const {
        isLoading,
        error,
        data: response,
        isSuccess,
    } = useQuery({
        queryKey: ['crewData'],
        queryFn: () => getCrews(Number(pageIndex), Number(pageSize)),
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page_index', pageIndex.toString());
        params.set('page_size', pageSize.toString());
        params.set('type', type);
        router.replace(`${pathname}?${params.toString()}`);

        if (isSuccess && response.data !== null) {
            const transformedData = response.data.map(item => {
                const root_work = {
                    id: String(item.root_work?.id),
                    title: item.root_work?.title,
                };
                return {
                    id: String(item.id),
                    title: item.title,
                    root_work: item.root_work ? root_work : null,
                };
            });

            const currentCrews = crewsFromStore;

            const newOrUpdatedCrews = transformedData.filter((crew: Crew) => {
                const existingCrew = currentCrews[crew.id];
                return (
                    !existingCrew ||
                    JSON.stringify(existingCrew) !== JSON.stringify(crew)
                );
            });

            if (newOrUpdatedCrews.length > 0) {
                addCrews(newOrUpdatedCrews);
            }
            const ids = transformedData.map((crew: Crew) => crew.id) || [];
            setCurrentPageIds(ids);
        }
    }, [isSuccess, response?.data, crewsFromStore, addCrews]);

    const crews = currentPageIds.map(id => crewsFromStore[id]);

    const handleItemClick = (id: string, workId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('entry', id);
        params.set('show', workId);
        params.set('h', workId);
        if (type === 'work') {
            params.set('panel', 'h');
            router.push(`${WORK_HOME_ROUTE.pathname}?${params.toString()}`);
        } else {
            params.set('panel', 'm');
            router.push(`${CREW_HOME_ROUTE.pathname}?${params.toString()}`);
        }
    };

    const entry = searchParams.get('entry');

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">{type} list</h1>
            <Tabs
                value={type}
                onValueChange={value => handleTypeChange(value)}
                className="w-full"
            >
                <TabsList className="bg-zinc-900 border border-zinc-800">
                    {['crew', 'work'].map(t => (
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
            {error ? (
                <div>Error: {error.message}</div>
            ) : isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul className="space-y-4">
                    {crews.map(item => (
                        <li key={item.id}>
                            <Card
                                className={`cursor-pointer transition-colors ${
                                    entry === item.id
                                        ? 'bg-secondary text-secondary-foreground'
                                        : 'bg-primary text-primary-foreground'
                                }`}
                                onClick={() =>
                                    handleItemClick(
                                        item.id,
                                        item?.root_work?.id ?? ''
                                    )
                                }
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
            )}
        </div>
    );
}

export default Workspace;
