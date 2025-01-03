'use client';

import React from 'react';
import Panel from './Panel';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import RouteTabs from './RouteTabs';
import {
    CREW_ROUTE_GROUP_ROUTES,
    WORK_ROUTE_GROUP_ROUTES,
    WORKSPACE_ROUTE,
} from '@/app/routes';
import { getRouteGroup } from '@/lib/utils';
import { CREW_ROUTE_GROUP } from '@/types/RouteGroup';

interface CrewWorkLayoutProps {
    children: React.ReactNode;
}

const CrewWorkLayout: React.FC<CrewWorkLayoutProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const isCrewRouteGroup = getRouteGroup(pathname) === CREW_ROUTE_GROUP;

    return (
        <div className="flex-1 flex">
            <div className="w-96 border-r border-zinc-800 p-4 bg-black">
                <Panel />
            </div>
            <div className="flex-1 flex flex-col">
                <div className="p-6">
                    <h1
                        className="text-2xl font-bold tracking-tight text-white cursor-pointer"
                        onClick={handleRouteChange}
                    >
                        {`Title of the ${
                            isCrewRouteGroup ? 'crew' : 'work'
                        } goes here [X]`}
                    </h1>
                </div>
                <div className="px-6">
                    <RouteTabs
                        routes={
                            isCrewRouteGroup
                                ? CREW_ROUTE_GROUP_ROUTES
                                : WORK_ROUTE_GROUP_ROUTES
                        }
                    />
                    <div className="mt-6">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default CrewWorkLayout;
