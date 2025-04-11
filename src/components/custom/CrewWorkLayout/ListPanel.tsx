import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    extractPathnameAfterWorkId,
    extractWorkId,
    getRouteGroup,
} from '@/lib/utils';
import { getWorksForCrewApi } from '@/lib/client-only-api';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Work } from '@/types/Work';
import { Input } from '@/components/ui/input';
import WorkCard from './WorkCard';
import { CREW_ROUTE_GROUP, WORK_ROUTE_GROUP } from '@/types/RouteGroup';
import { WORK_HOME_ROUTE, WORKSPACE_ROUTE } from '@/app/routes';
import { HIERARCHY, MANAGE } from '@/lib/constants';

const ListPanel = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        server: { works },
        getWorkSafe,
        addWorks,
    } = useCrewWorkLayoutStore(store => store);

    const workId: string = extractWorkId(pathname);

    const work: Work | undefined = getWorkSafe(workId);

    const crewId: string = work?.crew?.id ?? '';

    const [workIds, setWorkIds] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    const panel = searchParams.get('panel');

    useEffect(() => {
        if (panel === MANAGE) {
            if (crewId && workIds.length === 0) {
                (async () => {
                    try {
                        const { data }: { data: Work[] | null } =
                            await getWorksForCrewApi({
                                crewId: crewId,
                                search: '',
                            });

                        const d = data ?? [];

                        addWorks(d);
                        setWorkIds(d.map(work => work.id));
                    } catch (e) {}
                })();
            }
        }
    }, [panel, crewId, workIds]);

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
        params.set('panel', HIERARCHY);

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
        <div className="h-full flex flex-col">
            <div className="flex-[1_1_0] flex overflow-y-auto">
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Search works..."
                        className="border-gray-700"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-none">
                        {workIds
                            .map(w => works[w])
                            .map((work: Work) => (
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
                </div>
            </div>
        </div>
    );
};

export default ListPanel;
