// TODO: get this use client removed or check if it is needed
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Panel from './Panel';
import CrewRouteGroupContentLayout from './CrewRouteGroupContentLayout';
import WorkRouteGroupContentLayout from './WorkRouteGroupContentLayout';
import { getRouteGroup } from '@/lib/utils';
import { CREW_ROUTE_GROUP } from '@/types/RouteGroup';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const Component =
        getRouteGroup(pathname) === CREW_ROUTE_GROUP
            ? CrewRouteGroupContentLayout
            : WorkRouteGroupContentLayout;

    return (
        <div className="flex-1 flex">
            <div className="w-96 border-r border-zinc-800 p-4 bg-black">
                <Panel />
            </div>
            <Component>{children}</Component>
        </div>
    );
};

export default MainLayout;
