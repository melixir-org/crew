'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Button } from '@/components/ui/button';
import { CREW_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import { CREW } from '@/lib/constants';

const CrewCreateDraftLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const redirectToPageWithIndex = (index: number) => {
        router.push(
            `${
                CREW_ROUTE_GROUP_ROUTES[index].pathname
            }?${searchParams.toString()}`
        );
    };

    const { setCrewCreateDraftRoute, resetCrewCreateDraft } =
        useCrewWorkLayoutStore(store => store);

    const currentPageIndex = CREW_ROUTE_GROUP_ROUTES.findIndex(
        route => route.pathname === pathname
    );

    const isLastPage = currentPageIndex === CREW_ROUTE_GROUP_ROUTES.length - 1;

    const isFirstPage = currentPageIndex === 0;

    const createMode = searchParams.get('create_mode');

    if (createMode === CREW) {
        return (
            <div>
                {isFirstPage ? (
                    <Button
                        onClick={() => {
                            resetCrewCreateDraft();
                            const params = new URLSearchParams(
                                searchParams.toString()
                            );
                            params.delete('create_mode');
                            router.push(
                                `${
                                    WORKSPACE_ROUTE.pathname
                                }?${params.toString()}`
                            );
                        }}
                    >
                        Discard
                    </Button>
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
                            CREW_ROUTE_GROUP_ROUTES.forEach(route => {
                                setCrewCreateDraftRoute(
                                    route.pathname,
                                    route => {
                                        route.validationOn = true;
                                    }
                                );
                            });
                        }}
                    >
                        Create
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            setCrewCreateDraftRoute(pathname, route => {
                                route.validationOn = true;
                            });
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

export default CrewCreateDraftLayout;
