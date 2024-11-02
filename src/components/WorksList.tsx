'use client';

import { addWorks, Work } from '@/store/features/worksSlice';
import { useAppDispatch, useAppSelector} from '@/store/hooks';
import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination"
import {useRouter} from 'next/navigation';
import { getWorks } from '@/api/works';


const WorksList = () => {
    const dispatch = useAppDispatch();
    const worksFromStore = useAppSelector((state) => (state.works));
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPageIds, setCurrentPageIds] = useState<string[]>([]);

    const itemsPerPage = 10;
    const router = useRouter();


    useEffect(() => {
        const fetchWorks = async (page: number) => {
            setLoading(true);
            setError(null);
            try {
                const response = await getWorks(page, itemsPerPage);
                if (!response.ok) {
                    throw new Error('Response was not ok');
                }
                dispatch(addWorks(response.data));
                const ids = response.data?.map((work: Work) => work.id) || [];
                setCurrentPageIds(ids);
                setTotalPages(response.totalPages || 1);
            } catch (error : unknown) {
                setError(error as string);
            } finally {
                setLoading(false);
            }
        }

        fetchWorks(currentPage);
    }, [dispatch,currentPage]);

    // i think we don't meed to chnage the url so check it
    useEffect(() => {
        router.push(`?page=${currentPage}`, { scroll: false });
    }, [currentPage, router]);

    const works = currentPageIds.map(id => worksFromStore[id]).filter(work => work !== undefined);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="w-96 bg-black text-white h-screen flex flex-col">
            <div className="p-4 text-lg font-semibold text-center">Works</div>
            <ul className="flex-1 overflow-y-auto">
                {works.map((work: Work) => (
                    <li className='my-2 mx-5 border-2 border-gray-500 p-1 rounded-lg' key={work.id}>
                        <p>Title : {work.title}</p>
                        <p>Description : {work.description}</p>
                    </li>
                ))}
            </ul>
            <Pagination className='my-10'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(2)}>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(3)}>3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage === totalPages ? currentPage : currentPage + 1)} className={currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default WorksList;
