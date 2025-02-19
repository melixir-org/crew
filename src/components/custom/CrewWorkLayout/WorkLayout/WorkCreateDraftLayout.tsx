'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Button } from '@/components/ui/button';
import {
    LEVEL_ROUTE,
    WORK_HOME_ROUTE,
    WORK_ROUTE_GROUP_ROUTES,
    WORKSPACE_ROUTE,
} from '@/app/routes';
import {
    extractPathnameAfterWorkId,
    extractWorkId,
    mergeOverride,
} from '@/lib/utils';
import { isWorkHomeValid } from '../../WorkHome/validation';
import { createWork, Work } from '@/types/Work';
import { isWorkLayoutValid } from './validation';
import { createWorkApi } from '@/lib/client-only-api';
import { createCrew, Crew } from '@/types/Crew';
import { TO_DO } from '@/types/WorkStatus';

const routesValidation: Record<string, (work: Work) => boolean> = {
    [WORK_HOME_ROUTE.pathname]: isWorkHomeValid,
    [LEVEL_ROUTE.pathname]: () => true,
};

const WorkCreateDraftLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {
        getCrewSafe,
        getWorkSafe,
        getWorkCreateLayout,
        setWorkCreateLayout,
        getWorkCreateDraftRoute,
        setWorkCreateDraftRoute,
        resetWorkCreateDraft,
    } = useCrewWorkLayoutStore(store => store);

    const workId: string = extractWorkId(pathname);
    const pathnameAfterWorkId: string = extractPathnameAfterWorkId(pathname);

    const work: Work | undefined = getWorkSafe(workId);
    const crew: Crew | undefined = getCrewSafe(work?.crew?.id);

    const currentPageIndex = WORK_ROUTE_GROUP_ROUTES.findIndex(
        route => route.pathname === pathnameAfterWorkId
    );

    const isLastPage = currentPageIndex === WORK_ROUTE_GROUP_ROUTES.length - 1;

    const isFirstPage = currentPageIndex === 0;

    const cw = searchParams.get('create_work') ?? '';

    const createWorkModeOn = cw === workId;

    const redirectToPageWithIndex = (index: number) => {
        router.push(
            `${WORKSPACE_ROUTE.pathname}/${workId}${
                WORK_ROUTE_GROUP_ROUTES[index].pathname
            }?${searchParams.toString()}`
        );
    };

    const validateLayout = () => {
        setWorkCreateLayout(layout => {
            layout.validationOn = true;
        });

        return isWorkLayoutValid(getWorkCreateLayout().work);
    };

    const validateAllRoute = () =>
        WORK_ROUTE_GROUP_ROUTES.reduce((p, route, index) => {
            if (p === -1) {
                setWorkCreateDraftRoute(route.pathname, r => {
                    r.validationOn = true;
                });

                const r = getWorkCreateDraftRoute(route.pathname);
                if (!routesValidation[route.pathname](r.work)) {
                    return index;
                }
            }

            return p;
        }, -1);

    if (createWorkModeOn) {
        return (
            <div className="flex justify-end gap-2">
                {isFirstPage ? (
                    <Button
                        className="w-32 bg-white text-black"
                        onClick={() => {
                            const params = new URLSearchParams(
                                searchParams.toString()
                            );
                            params.delete('create_work');
                            router.replace(`${pathname}?${params.toString()}`);
                            resetWorkCreateDraft();
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
                                const payload = createWork({ status: TO_DO });

                                mergeOverride(
                                    payload,
                                    ...WORK_ROUTE_GROUP_ROUTES.map(
                                        r =>
                                            getWorkCreateDraftRoute(r.pathname)
                                                .work
                                    ),
                                    createWork({
                                        title: getWorkCreateLayout().work.title,
                                        crew: createCrew({ id: crew?.id }),
                                        parent_id: cw,
                                    })
                                );

                                const { data } = await createWorkApi(payload);

                                const workId: string = data?.id ?? '';

                                const params = new URLSearchParams(
                                    searchParams.toString()
                                );
                                params.delete('create_work');

                                router.push(
                                    `${WORKSPACE_ROUTE.pathname}/${workId}${
                                        WORK_HOME_ROUTE.pathname
                                    }?${params.toString()}`
                                );

                                resetWorkCreateDraft();
                            }
                        }}
                    >
                        Create
                    </Button>
                ) : (
                    <Button
                        className="w-32 bg-white text-black"
                        onClick={() => {
                            setWorkCreateDraftRoute(
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

export default WorkCreateDraftLayout;
