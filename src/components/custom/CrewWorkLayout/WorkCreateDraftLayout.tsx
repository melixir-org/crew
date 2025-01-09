'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Button } from '@/components/ui/button';
import { WORK_ROUTE_GROUP_ROUTES } from '@/app/routes';
import { WORK } from '@/lib/constants';

const WorkCreateDraftLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const redirectToPageWithIndex = (index: number) => {
        router.push(
            `${
                WORK_ROUTE_GROUP_ROUTES[index].pathname
            }?${searchParams.toString()}`
        );
    };

    const { setWorkDraftValidationOn, resetWorkDraft } = useCrewWorkLayoutStore(
        store => store
    );

    const currentPageIndex = WORK_ROUTE_GROUP_ROUTES.findIndex(
        route => route.pathname === pathname
    );

    const isLastPage = currentPageIndex === WORK_ROUTE_GROUP_ROUTES.length - 1;

    const isFirstPage = currentPageIndex === 0;

    const createMode = searchParams.get('create_mode');

    if (createMode === WORK) {
        return (
            <div>
                {isFirstPage ? (
                    <Button onClick={resetWorkDraft}>Discard</Button>
                ) : (
                    <Button
                        onClick={() => {
                            redirectToPageWithIndex(currentPageIndex - 1);
                        }}
                    >
                        Back
                    </Button>
                )}
                {isLastPage ? (
                    <Button
                        onClick={() => {
                            WORK_ROUTE_GROUP_ROUTES.forEach(route => {
                                setWorkDraftValidationOn(route.pathname, false);
                            });
                        }}
                    >
                        Create
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            setWorkDraftValidationOn(pathname, true);
                            redirectToPageWithIndex(currentPageIndex + 1);
                        }}
                    >
                        Next
                    </Button>
                )}
            </div>
        );
    }

    return null;
};

export default WorkCreateDraftLayout;
