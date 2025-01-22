import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import UnpinnedWorkCard from '../UnpinnedWorkCard';
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
    const h = searchParams.get('h') ?? '';

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
                    workId: h,
                });

                const d = data ?? [];

                addWorks(d);
                setChildrenIds(d.map(work => work.id));
            } catch (e) {
            } finally {
                setLoading(false);
            }
        })();
    }, [h]);

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

    const handleHierarchyClick = (wid: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('h', wid);

        if (getRouteGroup(pathname) === CREW_ROUTE_GROUP) {
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${wid}${
                    WORK_HOME_ROUTE.pathname
                }?${params.toString()}`
            );
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
        const h = params.get('h') ?? '';
        params.set('create_work', h);
        if (workId === h) {
            router.replace(`${pathname}?${params.toString()}`);
        } else {
            router.push(
                `${WORKSPACE_ROUTE.pathname}/${h}${
                    WORK_HOME_ROUTE.pathname
                }?${params.toString()}`
            );
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <ul className="flex-1 overflow-y-auto mt-20">
            {childrenWorks.map((work: Work) => (
                <li key={work.id}>
                    <UnpinnedWorkCard
                        key={work.id}
                        title={work.title}
                        highlighted={isWorkShown(work.id)}
                        handleWorkClick={() => handleWorkClick(work.id)}
                        handleIconClick={() => handleHierarchyClick(work.id)}
                    />
                </li>
            ))}
            <Button className="bg-white text-black" onClick={handleCreateWork}>
                Create Work
            </Button>
        </ul>
    );
};

export default ChildrenPanel;
