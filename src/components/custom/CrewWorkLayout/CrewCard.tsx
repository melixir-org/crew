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

    const { getCrewSafe, getWorkSafe } = useCrewWorkLayoutStore(store => store);

    const work: Work | undefined = getWorkSafe(workId);

    const crew: Crew | undefined = getCrewSafe(work?.crew?.id);

    const handleCrewClick = () => {
        router.push(
            `${WORKSPACE_ROUTE.pathname}/${workId}${
                CREW_HOME_ROUTE.pathname
            }?${searchParams.toString()}`
        );
    };

    return (
        <div
            className={`h-9 px-2 rounded-md cursor-pointer flex items-center gap-2 ${
                getRouteGroup(pathname) === CREW_ROUTE_GROUP
                    ? 'border bg-secondary text-secondary-foreground'
                    : 'border border-gray-300'
            }`}
            onClick={() => handleCrewClick()}
        >
            <FolderRoot className="h-6 flex-none basis-6 text-gray-400" />
            <p className="h-6 overflow-hidden">{crew?.title ?? ''}</p>
        </div>
    );
};

export default CrewCard;
