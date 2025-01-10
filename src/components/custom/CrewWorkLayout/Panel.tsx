import { Work } from '@/types/Work';

import React, { useEffect, useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { getWorks } from '@/lib/client-only-api/work';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getRouteGroup } from '@/lib/utils';
import { CREW_ROUTE_GROUP, WORK_ROUTE_GROUP } from '@/types/RouteGroup';
import { CREW_HOME_ROUTE, WORK_HOME_ROUTE } from '@/app/routes';
import WorkCard from '../WorkCard';

const Panel = () => {
    const worksFromStore = useCrewWorkLayoutStore(store => store.state.works);
    const setWorks = useCrewWorkLayoutStore(store => store.actions.setWorks);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPageIds, setCurrentPageIds] = useState<string[]>([]);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchWorks = async (page: number) => {
            setLoading(true);
            setError(null);
            try {
                const response = await getWorks(page, itemsPerPage);
                if (!response.ok) {
                    throw new Error('Response was not ok');
                }
                setWorks(response.data);
                const ids = response.data?.map((work: Work) => work.id) || [];
                setCurrentPageIds(ids);
                setTotalPages(response.totalPages || 1);
            } catch (error: unknown) {
                setError(error as string);
            } finally {
                setLoading(false);
            }
        };

        fetchWorks(currentPage);
    }, [currentPage]);

    const works = currentPageIds.map(id => worksFromStore[id]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleCrewClick = () => {
        router.push(`${CREW_HOME_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const handleWorkClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('show', id);

        if (getRouteGroup(pathname) === CREW_ROUTE_GROUP) {
            router.push(`${WORK_HOME_ROUTE.pathname}?${params.toString()}`);
        } else {
            router.push(`${pathname}?${params.toString()}`);
        }
    };

    const handleHierarchyClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('h', id);
        params.set('show', id);

        if (getRouteGroup(pathname) === CREW_ROUTE_GROUP) {
            router.push(`${WORK_HOME_ROUTE.pathname}?${params.toString()}`);
        } else {
            router.push(`${pathname}?${params.toString()}`);
        }
    };

    const isWorkShown = (id: string) => {
        return (
            getRouteGroup(pathname) === WORK_ROUTE_GROUP &&
            searchParams.get('show') === id
        );
    };

    return (
        <div className="w-96 bg-black text-white h-screen flex flex-col">
            <div className="p-4 text-lg font-semibold text-center">Works</div>
            <div
                className={`my-2 mx-5 border-2 border-gray-500 p-1 rounded-lg cursor-pointer ${
                    getRouteGroup(pathname) === CREW_ROUTE_GROUP
                        ? 'bg-secondary text-secondary-foreground'
                        : ''
                }`}
                onClick={() => handleCrewClick()}
            >
                <p>Crew</p>
            </div>
            <ul className="flex-1 overflow-y-auto">
                {works.map((work: Work) => (
                    <li key={work.id}>
                        <WorkCard
                            key={work.id}
                            title={work.title}
                            highlighted={isWorkShown(work.id)}
                            handleWorkClick={() => handleWorkClick(work.id)}
                            handleIconClick={() =>
                                handleHierarchyClick(work.id)
                            }
                        />
                    </li>
                ))}
            </ul>
            <Pagination className="my-10">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                handlePageChange(
                                    currentPage > 1 ? currentPage - 1 : 1
                                )
                            }
                            className={
                                currentPage === 1
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                            }
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => handlePageChange(1)}
                            isActive={currentPage === 1}
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(2)}>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(3)}>
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                handlePageChange(
                                    currentPage === totalPages
                                        ? currentPage
                                        : currentPage + 1
                                )
                            }
                            className={
                                currentPage === totalPages
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default Panel;
