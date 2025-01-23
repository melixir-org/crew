import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import WorkCard from './WorkCard';
import { Input } from '@/components/ui/input';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import {
    extractPathnameAfterWorkId,
    extractWorkId,
    getRouteGroup,
} from '@/lib/utils';
import { Work } from '@/types/Work';
import { CREW_ROUTE_GROUP, WORK_ROUTE_GROUP } from '@/types/RouteGroup';
import { WORK_HOME_ROUTE, WORKSPACE_ROUTE } from '@/app/routes';
import { getChildrenApi } from '@/lib/client-only-api';
import { Button } from '@/components/ui/button';

const ChildrenPanel = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);
    const pin = searchParams.get('pin') ?? '';

    const {
        server: { works },
        addWorks,
    } = useCrewWorkLayoutStore(store => store);

    const [loading, setLoading] = useState(true);
    const [childrenIds, setChildrenIds] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await getChildrenApi({
                    workId: pin,
                });

                const d = data ?? [];

                addWorks(d);
                setChildrenIds(d.map(work => work.id));
            } catch (e) {
            } finally {
                setLoading(false);
            }
        })();
    }, [pin]);

    const childrenWorks = childrenIds.map(id => works[id]);

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

    return (
        <div className="h-full flex flex-col gap-1">
            <Input placeholder="Search works..." className="border-gray-700" />
            <div className="flex-1 ml-5 flex flex-col gap-1">
                {loading ? (
                    <div className="m-auto">Loading...</div>
                ) : (
                    childrenWorks.map((work: Work) => (
                        <WorkCard
                            key={work.id}
                            work={work}
                            highlighted={isWorkShown(work.id)}
                            handleClick={() => handleWorkClick(work.id)}
                            pinned={false}
                            handlePin={() => handlePin(work.id)}
                        />
                    ))
                )}
            </div>
            <div className="ml-5">
                <Button
                    className="w-full bg-white text-black"
                    onClick={handleCreateWork}
                >
                    Create Work
                </Button>
            </div>
        </div>
    );
};

export default ChildrenPanel;
