import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import WorkCard from '../WorkCard';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { getRouteGroup } from '@/lib/utils';
import { Work } from '@/types/Work';
import { CREW_ROUTE_GROUP, WORK_ROUTE_GROUP } from '@/types/RouteGroup';
import { CREW_HOME_ROUTE, WORK_HOME_ROUTE } from '@/app/routes';
import { getChildrenApi } from '@/lib/client-only-api';

const ChildrenPanel = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

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
                    parentWorkId: h,
                });

                const d = (data ?? []).map(child => child.child);

                addWorks(d);
                setChildrenIds(d.map(work => work.id));
            } catch (e) {
            } finally {
                setLoading(false);
            }
        })();
    }, [h]);

    const childrenWorks = childrenIds.map(id => works[id]);

    const handleWorkClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('show', id);

        if (getRouteGroup(pathname) === CREW_ROUTE_GROUP) {
            router.push(`${WORK_HOME_ROUTE.pathname}?${params.toString()}`);
        } else {
            router.replace(`${pathname}?${params.toString()}`);
        }
    };

    const handleHierarchyClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('h', id);
        params.set('show', id);

        if (getRouteGroup(pathname) === CREW_ROUTE_GROUP) {
            router.push(`${WORK_HOME_ROUTE.pathname}?${params.toString()}`);
        } else {
            router.replace(`${pathname}?${params.toString()}`);
        }
    };

    const isWorkShown = (id: string) => {
        return (
            getRouteGroup(pathname) === WORK_ROUTE_GROUP &&
            searchParams.get('show') === id
        );
    };

    if (loading) return <div>Loading...</div>;

    return (
        <ul className="flex-1 overflow-y-auto">
            {childrenWorks.map((work: Work) => (
                <li key={work.id}>
                    <WorkCard
                        key={work.id}
                        title={work.title}
                        highlighted={isWorkShown(work.id)}
                        handleWorkClick={() => handleWorkClick(work.id)}
                        handleIconClick={() => handleHierarchyClick(work.id)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ChildrenPanel;
