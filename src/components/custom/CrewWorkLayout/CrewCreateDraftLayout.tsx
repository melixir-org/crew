'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Button } from '@/components/ui/button';
import {
    CREW_HOME_ROUTE,
    CREW_ROUTE_GROUP_ROUTES,
    SETTINGS_ROUTE,
    WORKSPACE_ROUTE,
} from '@/app/routes';
import { CREW } from '@/lib/constants';
import { isCrewHomeValid } from '@/components/custom/CrewHome/validation';
import { createCrew, Crew } from '@/types/Crew';
import { createCrewApi } from '@/lib/client-only-api';
import { mergeOverride } from '@/store/utils';
import { createWork } from '@/types/Work';
import { TO_DO } from '@/types/WorkStatus';

const routeValidations: Record<string, (crew: Crew) => boolean> = {
    [CREW_HOME_ROUTE.pathname]: isCrewHomeValid,
    [SETTINGS_ROUTE.pathname]: () => true,
};

const CrewCreateDraftLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {
        getCrewCreateDraftRoute,
        setCrewCreateDraftRoute,
        resetCrewCreateDraft,
    } = useCrewWorkLayoutStore(store => store);

    const currentPageIndex = CREW_ROUTE_GROUP_ROUTES.findIndex(
        route => route.pathname === pathname
    );

    const isLastPage = currentPageIndex === CREW_ROUTE_GROUP_ROUTES.length - 1;

    const isFirstPage = currentPageIndex === 0;

    const createMode = searchParams.get('create_mode');

    const redirectToPageWithIndex = (index: number) => {
        router.push(
            `${
                CREW_ROUTE_GROUP_ROUTES[index].pathname
            }?${searchParams.toString()}`
        );
    };

    const validateAllRoute = () =>
        CREW_ROUTE_GROUP_ROUTES.reduce((p, route, index) => {
            if (p === -1) {
                setCrewCreateDraftRoute(route.pathname, r => {
                    r.validationOn = true;
                });

                const r = getCrewCreateDraftRoute(route.pathname);
                if (!routeValidations[route.pathname](r.crew)) {
                    return index;
                }
            }

            return p;
        }, -1);

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
                        onClick={async () => {
                            const index = validateAllRoute();
                            if (index >= 0) {
                                redirectToPageWithIndex(index);
                            } else {
                                const payload = createCrew(
                                    undefined,
                                    'Crew title is here',
                                    createWork(
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        TO_DO
                                    )
                                );
                                mergeOverride(
                                    payload,
                                    ...CREW_ROUTE_GROUP_ROUTES.map(
                                        r =>
                                            getCrewCreateDraftRoute(r.pathname)
                                                .crew
                                    ),
                                    payload
                                );

                                const { data } = await createCrewApi(payload);

                                const rootWorkId: string =
                                    data?.root_work?.id ?? '';

                                const params = new URLSearchParams(
                                    searchParams.toString()
                                );
                                params.delete('create_mode');
                                params.set('entry', rootWorkId);
                                params.set('show', rootWorkId);
                                params.set('h', rootWorkId);
                                params.set('panel', 'h');
                                router.push(
                                    `${
                                        CREW_HOME_ROUTE.pathname
                                    }?${params.toString()}`
                                );
                                resetCrewCreateDraft();
                            }
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
