'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePageStore } from '@/provider/PageStore';
import {
    CREW_HOME_ROUTE,
    WORK_HOME_ROUTE,
    WORKSPACE_ROUTE,
} from '@/app/routes';
import { CREW, HIERARCHY, MANAGE, NEW, WORK } from '@/lib/constants';
import WorkList from './WorkList';
import CrewList from './CrewList';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    PaginationLink,
} from '@/components/ui/pagination';

function Workspace({ ids }: { ids: string[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { crews, works } = usePageStore(store => store.server);

    const pageIndex = parseInt(searchParams.get('page_index') || '0', 10);
    const pageSize = parseInt(searchParams.get('page_size') || '10', 10);
    const type = searchParams.get('type') || WORK;

    const workItems = ids.map(id => works[id]);
    const crewItems = ids.map(id => crews[id]);

    const items = type === WORK ? workItems : crewItems;
    const totalPages = Math.ceil(items.length / pageSize);

    const currentItems = items.slice(
        pageIndex * pageSize,
        (pageIndex + 1) * pageSize
    );

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) =>
            params.set(key, value)
        );
        router.replace(`?${params.toString()}`);
    };
    const handlePageChange = (newPageIndex: number) => {
        if (newPageIndex >= 0 && newPageIndex < totalPages) {
            updateParams({ page_index: newPageIndex.toString() });
        }
    };

    const handleTypeChange = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('type', type);
        params.set('page_index', '0');
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleItemClick = (id: string, workId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('entry', id);
        params.set('pin', workId);
        if (type === WORK) {
            params.set('panel', HIERARCHY);
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${workId}${
                    WORK_HOME_ROUTE.pathname
                }?${params.toString()}`
            );
        } else {
            params.set('panel', MANAGE);
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

    const renderPagination = () => {
        const maxLinks = 5;
        const current = pageIndex;
        const range = Array.from({ length: totalPages }, (_, i) => i).filter(
            i =>
                i === 0 ||
                i === totalPages - 1 ||
                (i >= current - 1 && i <= current + 1)
        );

        return (
            <Pagination className="mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                handlePageChange(Math.max(0, pageIndex - 1))
                            }
                            className="cursor-pointer"
                        />
                    </PaginationItem>

                    {range.map((i, idx) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={i === pageIndex}
                                onClick={() => handlePageChange(i)}
                                className="cursor-pointer"
                            >
                                {i + 1}
                            </PaginationLink>
                            {idx < range.length - 1 &&
                                range[idx + 1] !== i + 1 && (
                                    <span className="px-2 text-muted-foreground font-bold text-white">
                                        ...
                                    </span>
                                )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                handlePageChange(
                                    Math.min(totalPages - 1, pageIndex + 1)
                                )
                            }
                            className="cursor-pointer"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
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
                <WorkList
                    items={currentItems}
                    handleItemClick={handleItemClick}
                />
            )}
            {type === CREW && (
                <CrewList
                    items={currentItems}
                    handleItemClick={handleItemClick}
                />
            )}
            {totalPages > 1 && renderPagination()}
        </div>
    );
}

export default Workspace;
