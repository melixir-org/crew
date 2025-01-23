import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CREW_HOME_ROUTE, WORKSPACE_ROUTE } from '@/app/routes';
import { extractWorkId, getRouteGroup } from '@/lib/utils';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { CREW_ROUTE_GROUP } from '@/types/RouteGroup';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { FolderRoot } from 'lucide-react';

const CrewCard = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);

    const {
        server: { works, crews },
    } = useCrewWorkLayoutStore(store => store);

    const work: Work | undefined = works[workId] ? works[workId] : undefined;
    const crew: Crew | undefined = work
        ? crews[work.crew?.id ?? '']
        : undefined;

    const handleCrewClick = () => {
        router.push(
            `${WORKSPACE_ROUTE.pathname}/${workId}${
                CREW_HOME_ROUTE.pathname
            }?${searchParams.toString()}`
        );
    };

    return (
        <div
            className={`py-1 px-2 rounded-md cursor-pointer flex flex-row items-center gap-2 ${
                getRouteGroup(pathname) === CREW_ROUTE_GROUP
                    ? 'border bg-secondary text-secondary-foreground'
                    : 'border border-gray-300'
            }`}
            onClick={() => handleCrewClick()}
        >
            <FolderRoot className="h-4 w-4 text-gray-400" />
            <p className="min-h-6">{crew?.title ?? ''}</p>
        </div>
    );
};

export default CrewCard;
