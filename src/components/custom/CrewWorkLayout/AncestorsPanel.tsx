import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import WorkCard from './WorkCard';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import {
    extractPathnameAfterWorkId,
    extractWorkId,
    getRouteGroup,
} from '@/lib/utils';
import { Work } from '@/types/Work';
import { CREW_ROUTE_GROUP, WORK_ROUTE_GROUP } from '@/types/RouteGroup';
import { WORK_HOME_ROUTE, WORKSPACE_ROUTE } from '@/app/routes';
import { getAncestorsApi } from '@/lib/client-only-api';

const AncestorsPanel = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);
    const pin = searchParams.get('pin') ?? '';

    const {
        server: { works },
        addWorks,
    } = useCrewWorkLayoutStore(store => store);

    const [loading, setLoading] = useState(false);
    const [ancestorIds, setAncestorIds] = useState<string[]>([]);

    useEffect(() => {
        function ancestors(wid: string): string[] {
            const parentId = works[wid]?.parent_id;

            if (parentId) {
                return [wid, ...ancestors(parentId)];
            }

            return [wid];
        }

        const ancs = ancestors(pin);

        if (ancs.length <= 1) {
            (async () => {
                setLoading(true);
                try {
                    const { data } = await getAncestorsApi({
                        workId: pin,
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
        } else {
            setAncestorIds(ancs.reverse());
        }
    }, [pin]);

    const ancestorWorks = ancestorIds.map(id => works[id]);

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

    const handleUnpin = (wid: string) => {
        const parentId = works[wid].parent_id ?? '';

        const params = new URLSearchParams(searchParams.toString());
        params.set('pin', parentId);

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

    return (
        <div className="h-full flex flex-col gap-1">
            {loading ? (
                <div className="m-auto">Loading...</div>
            ) : (
                ancestorWorks.map((work: Work) => (
                    <WorkCard
                        key={work.id}
                        work={work}
                        highlighted={isWorkShown(work.id)}
                        handleClick={() => handleWorkClick(work.id)}
                        pinned={true}
                        hideIcon={!work.parent_id}
                        handleUnpin={() => handleUnpin(work.id)}
                    />
                ))
            )}
        </div>
    );
};

export default AncestorsPanel;
