'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Button } from '@/components/ui/button';
import { CREW_ROUTE_GROUP_ROUTES } from '@/app/routes';
import { CREW } from '@/lib/constants';

interface CrewCreateDraftLayoutProps {}

const CrewCreateDraftLayout: React.FC<CrewCreateDraftLayoutProps> = ({}) => {
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
    const { setCrewDraftValidationOn } = useCrewWorkLayoutStore(store => store);

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
                    <Button>Discard</Button>
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
                                setCrewDraftValidationOn(route.pathname, false);
                            });
                        }}
                    >
                        Create
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            setCrewDraftValidationOn(pathname, true);
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
