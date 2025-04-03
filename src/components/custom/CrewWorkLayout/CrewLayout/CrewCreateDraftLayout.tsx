'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Button } from '@/components/ui/button';
import {
    CREW_HOME_ROUTE,
    CREW_ROUTE_GROUP_ROUTES,
    MEMBERS_ROUTE,
    WORKSPACE_ROUTE,
} from '@/app/routes';
import { isCrewHomeValid } from '@/components/custom/CrewHome/validation';
import { createCrew, Crew } from '@/types/Crew';
import { createCrewApi } from '@/lib/client-only-api';
import { extractPathnameAfterWorkId, mergeOverride } from '@/lib/utils';
import { createWork } from '@/types/Work';
import { TO_DO } from '@/types/WorkStatus';
import { extractWorkId } from '@/lib/utils';
import { NEW } from '@/lib/constants';
import { isCrewLayoutValid } from './validation';

const routesValidation: Record<string, (crew: Crew) => boolean> = {
    [CREW_HOME_ROUTE.pathname]: isCrewHomeValid,
    [MEMBERS_ROUTE.pathname]: () => true,
};

const CrewCreateDraftLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {
        getCrewCreateLayout,
        setCrewCreateLayout,
        getCrewCreateDraftRoute,
        setCrewCreateDraftRoute,
        resetCrewCreateDraft,
    } = useCrewWorkLayoutStore(store => store);

    const workId: string = extractWorkId(pathname);
    const pathnameAfterWorkId: string = extractPathnameAfterWorkId(pathname);

    const currentPageIndex = CREW_ROUTE_GROUP_ROUTES.findIndex(
        route => route.pathname === pathnameAfterWorkId
    );

    const isLastPage = currentPageIndex === CREW_ROUTE_GROUP_ROUTES.length - 1;

    const isFirstPage = currentPageIndex === 0;

    const crewCreateMode = workId === NEW;

    const redirectToPageWithIndex = (index: number) => {
        router.push(
            `${WORKSPACE_ROUTE.pathname}/${workId}${
                CREW_ROUTE_GROUP_ROUTES[index].pathname
            }?${searchParams.toString()}`
        );
    };

    const validateLayout = () => {
        setCrewCreateLayout(layout => {
            layout.validationOn = true;
        });

        return isCrewLayoutValid(getCrewCreateLayout().crew);
    };

    const validateAllRoute = () =>
        CREW_ROUTE_GROUP_ROUTES.reduce((p, route, index) => {
            if (p === -1) {
                setCrewCreateDraftRoute(route.pathname, r => {
                    r.validationOn = true;
                });

                const r = getCrewCreateDraftRoute(route.pathname);
                if (!routesValidation[route.pathname](r.crew)) {
                    return index;
                }
            }

            return p;
        }, -1);

    if (crewCreateMode) {
        return (
            <div className="flex justify-end gap-2">
                {isFirstPage ? (
                    <Button
                        className="w-32 bg-white text-black"
                        onClick={() => {
                            resetCrewCreateDraft();
                            router.push(
                                `${
                                    WORKSPACE_ROUTE.pathname
                                }?${searchParams.toString()}`
                            );
                        }}
                    >
                        Discard
                    </Button>
                ) : (
                    <Button
                        className="w-32 bg-white text-black"
                        onClick={() => {
                            redirectToPageWithIndex(currentPageIndex - 1);
                        }}
                    >
                        Back
                    </Button>
                )}
                {isLastPage ? (
                    <Button
                        className="w-32 bg-white text-black"
                        onClick={async () => {
                            const vl = validateLayout();
                            const invalidRouteIndex = validateAllRoute();

                            if (invalidRouteIndex >= 0) {
                                redirectToPageWithIndex(invalidRouteIndex);
                            }

                            if (vl && invalidRouteIndex === -1) {
                                const payload = createCrew();

                                mergeOverride(
                                    payload,
                                    ...CREW_ROUTE_GROUP_ROUTES.map(
                                        r =>
                                            getCrewCreateDraftRoute(r.pathname)
                                                .crew
                                    ),
                                    createCrew({
                                        title: getCrewCreateLayout().crew.title,
                                        root_work: createWork({
                                            status: TO_DO,
                                        }),
                                    })
                                );

                                const { data }: { data: Crew | null } =
                                    await createCrewApi(payload);

                                if (data) {
                                    const rootWorkId: string =
                                        data.root_work?.id ?? '';

                                    const params = new URLSearchParams(
                                        searchParams.toString()
                                    );
                                    params.set('entry', data.id);
                                    params.set('pin', rootWorkId);
                                    params.set('panel', 'hierarchy');
                                    router.push(
                                        `${
                                            WORKSPACE_ROUTE.pathname
                                        }/${rootWorkId}${
                                            CREW_HOME_ROUTE.pathname
                                        }?${params.toString()}`
                                    );
                                    resetCrewCreateDraft();
                                }
                            }
                        }}
                    >
                        Create
                    </Button>
                ) : (
                    <Button
                        className="w-32 bg-white text-black"
                        onClick={() => {
                            setCrewCreateDraftRoute(
                                pathnameAfterWorkId,
                                route => {
                                    route.validationOn = true;
                                }
                            );
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
