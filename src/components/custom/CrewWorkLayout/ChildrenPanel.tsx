import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import WorkCard from './WorkCard';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import {
    extractPathnameAfterWorkId,
    extractWorkId,
    getRouteGroup,
    hasWorkUpdatePermission,
} from '@/lib/utils';
import { Work } from '@/types/Work';
import { CREW_ROUTE_GROUP, WORK_ROUTE_GROUP } from '@/types/RouteGroup';
import { WORK_HOME_ROUTE, WORKSPACE_ROUTE } from '@/app/routes';
import { getChildrenApi } from '@/lib/client-only-api';
import { Button } from '@/components/ui/button';
import { Crew } from '@/types/Crew';

const ChildrenPanel = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);
    const pin = searchParams.get('pin') ?? '';

    const {
        server: { works, user },
        getCrewSafe,
        getWorkSafe,
        addWorks,
    } = useCrewWorkLayoutStore(store => store);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await getChildrenApi({
                    workId: pin,
                    search,
                });

                const d = data ?? [];

                addWorks(d);
            } catch (e) {
            } finally {
                setLoading(false);
            }
        })();
    }, [pin, search]);

    const childrenWorks = Object.entries(works)
        .map(([_k, v]) => v)
        .filter(work => work.parent_id === pin);

    const handleWorkClick = (wid: string) => {
        if (getRouteGroup(pathname) === CREW_ROUTE_GROUP) {
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${wid}${
                    WORK_HOME_ROUTE.pathname
                }?${searchParams.toString()}`
            );
        } else {
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${wid}${extractPathnameAfterWorkId(
                    pathname
                )}?${searchParams.toString()}`
            );
        }
    };

    const handlePin = (wid: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('pin', wid);

        if (getRouteGroup(pathname) === CREW_ROUTE_GROUP) {
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${wid}${
                    WORK_HOME_ROUTE.pathname
                }?${params.toString()}`
            );
        } else if (workId === wid) {
            router.replace(`${pathname}?${params.toString()}`);
        } else {
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${wid}${extractPathnameAfterWorkId(
                    pathname
                )}?${params.toString()}`
            );
        }
    };

    const isWorkShown = (id: string) => {
        return getRouteGroup(pathname) === WORK_ROUTE_GROUP && workId === id;
    };

    const handleCreateWork = () => {
        const params = new URLSearchParams(searchParams);
        const pin = params.get('pin') ?? '';
        params.set('create_work', pin);
        if (workId === pin) {
            router.replace(`${pathname}?${params.toString()}`);
        } else {
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${pin}${
                    WORK_HOME_ROUTE.pathname
                }?${params.toString()}`
            );
        }
    };

    const work: Work | undefined = getWorkSafe(workId);

    const crew: Crew | undefined = getCrewSafe(work?.crew?.id);

    const pinnedWork: Work | undefined = getWorkSafe(pin);

    return (
        <div className="h-full flex flex-col gap-1">
            <Input
                placeholder="Search child works..."
                className="border-gray-700"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-none">
                {loading
                    ? [...Array(10)].map((_, i) => (
                          <Skeleton
                              key={i}
                              className="bg-gray-700 w-full flex-[0_0_62px] rounded-lg"
                          />
                      ))
                    : childrenWorks.map((work: Work) => (
                          <WorkCard
                              key={work.id}
                              work={work}
                              highlighted={isWorkShown(work.id)}
                              handleClick={() => handleWorkClick(work.id)}
                              pinned={false}
                              handlePin={() => handlePin(work.id)}
                          />
                      ))}
            </div>
            {hasWorkUpdatePermission(user, crew, pinnedWork) && (
                <Button
                    className="w-full bg-white text-black"
                    onClick={() => handleCreateWork()}
                >
                    Create Child Work
                </Button>
            )}
        </div>
    );
};

export default ChildrenPanel;
