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
    PaginationEllipsis,
    PaginationLink,
} from '@/components/ui/pagination';

function Workspace({ ids, totalIds }: { ids: string[]; totalIds: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { crews, works } = usePageStore(store => store.server);

    const pageIndex = +(searchParams.get('page_index') || '0');
    const pageSize = +(searchParams.get('page_size') || '10');
    const type = searchParams.get('type') || CREW;

    const items =
        type === WORK ? ids.map(id => works[id]) : ids.map(id => crews[id]);

    const totalPages = Math.ceil(totalIds / pageSize);

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) =>
            params.set(key, value)
        );
        router.replace(`?${params.toString()}`);
    };

    const handlePageChange = (newPageIndex: number) => {
        updateParams({ page_index: newPageIndex.toString() });
    };

    const handleTypeChange = (type: string) => {
        updateParams({ type, page_index: '0' });
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

    const currentPage = pageIndex + 1;

    return (
        <div className="container p-1 flex gap-2">
            <Button
                className="w-96 bg-white text-black hover:bg-white"
                onClick={handleCreateCrew}
            >
                Create Crew
            </Button>
            <div className="flex-1 max-w-5xl flex flex-col gap-2">
                <Tabs
                    value={type}
                    onValueChange={value => handleTypeChange(value)}
                    className="w-60"
                >
                    <TabsList className="grid grid-cols-2">
                        {[CREW, WORK].map(t => (
                            <TabsTrigger
                                key={t}
                                value={t}
                                className="data-[state=active]:bg-black data-[state=active]:text-white"
                            >
                                {t}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col">
                        {type === WORK && (
                            <WorkList
                                items={items}
                                handleItemClick={handleItemClick}
                            />
                        )}
                        {type === CREW && (
                            <CrewList
                                items={items}
                                handleItemClick={handleItemClick}
                            />
                        )}
                    </div>
                </div>
                <Pagination className="mt-6">
                    <PaginationContent>
                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        handlePageChange(
                                            Math.max(0, pageIndex - 1)
                                        )
                                    }
                                    className="cursor-pointer"
                                />
                            </PaginationItem>
                        )}
                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                isActive={true}
                                className="cursor-pointer text-black"
                            >
                                {currentPage}
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage < totalPages && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        {currentPage < totalPages && (
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        handlePageChange(
                                            Math.min(
                                                totalPages - 1,
                                                pageIndex + 1
                                            )
                                        )
                                    }
                                    className="cursor-pointer"
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}

export default Workspace;
