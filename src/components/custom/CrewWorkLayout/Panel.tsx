import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import WorkCard from '../WorkCard';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { getRouteGroup } from '@/lib/utils';
import { Work } from '@/types/Work';
import { CREW_ROUTE_GROUP, WORK_ROUTE_GROUP } from '@/types/RouteGroup';
import { CREW_HOME_ROUTE, WORK_HOME_ROUTE } from '@/app/routes';
import { getAncestorsApi } from '@/lib/client-only-api';

const Panel = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const {
        server: { works },
        addWorks,
    } = useCrewWorkLayoutStore(store => store);

    const [loading, setLoading] = useState(true);
    const [ancestorIds, setAncestorIds] = useState<string[]>([]);

    const show = searchParams.get('show') ?? '';

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await getAncestorsApi({
                    workId: show,
                    length: 5,
                });

                const d = data ?? [];

                addWorks(d);
                setAncestorIds(d.map(work => work.id).reverse());
            } catch (e) {
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const ancestorWorks = ancestorIds.map(id => works[id]);

    const handleCrewClick = () => {
        router.push(`${CREW_HOME_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const handleWorkClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('show', id);

        if (getRouteGroup(pathname) === CREW_ROUTE_GROUP) {
            router.push(`${WORK_HOME_ROUTE.pathname}?${params.toString()}`);
        } else {
            router.push(`${pathname}?${params.toString()}`);
        }
    };

    const handleHierarchyClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('h', id);
        params.set('show', id);

        if (getRouteGroup(pathname) === CREW_ROUTE_GROUP) {
            router.push(`${WORK_HOME_ROUTE.pathname}?${params.toString()}`);
        } else {
            router.push(`${pathname}?${params.toString()}`);
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
        <div className="w-96 bg-black text-white h-screen flex flex-col">
            <div className="p-4 text-lg font-semibold text-center">Works</div>
            <div
                className={`my-2 mx-5 border-2 border-gray-500 p-1 rounded-lg cursor-pointer ${
                    getRouteGroup(pathname) === CREW_ROUTE_GROUP
                        ? 'bg-secondary text-secondary-foreground'
                        : ''
                }`}
                onClick={() => handleCrewClick()}
            >
                <p>Crew</p>
            </div>
            <ul className="flex-1 overflow-y-auto">
                {ancestorWorks.map((work: Work) => (
                    <li key={work.id}>
                        <WorkCard
                            key={work.id}
                            title={work.title}
                            highlighted={isWorkShown(work.id)}
                            handleWorkClick={() => handleWorkClick(work.id)}
                            handleIconClick={() =>
                                handleHierarchyClick(work.id)
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Panel;
