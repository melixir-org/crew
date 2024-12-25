// TODO: get this use client removed or check if it is needed
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Panel from './Panel';
import CrewRouteGroupContentLayout from './CrewRouteGroupContentLayout';
import WorkRouteGroupContentLayout from './WorkRouteGroupContentLayout';
import { getRouteGroup } from '@/lib/utils';
import { CREW_ROUTE_GROUP, WORK_ROUTE_GROUP } from '@/types/RouteGroup';
import NoLayout from '../NoLayout';

interface CrewWorkLayoutProps {
    children: React.ReactNode;
}

const ROUTE_GROUP_TO_CONTENT_LAYOUT_MAPPING = {
    [CREW_ROUTE_GROUP]: CrewRouteGroupContentLayout,
    [WORK_ROUTE_GROUP]: WorkRouteGroupContentLayout,
    '': NoLayout,
};

const CrewWorkLayout: React.FC<CrewWorkLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const ContentLayout =
        ROUTE_GROUP_TO_CONTENT_LAYOUT_MAPPING[getRouteGroup(pathname) ?? ''];

    return (
        <div className="flex-1 flex">
            <div className="w-96 border-r border-zinc-800 p-4 bg-black">
                <Panel />
            </div>
            <ContentLayout>{children}</ContentLayout>
        </div>
    );
};

export default CrewWorkLayout;
