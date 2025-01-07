'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import Panel from './Panel';
import CrewLayout from './CrewLayout';
import WorkLayout from './WorkLayout';
import { CREW_ROUTE_GROUP } from '@/types/RouteGroup';
import { getRouteGroup } from '@/lib/utils';

interface CrewWorkLayoutProps {
    children: React.ReactNode;
}

const CrewWorkLayout: React.FC<CrewWorkLayoutProps> = ({ children }) => {
    const pathname = usePathname();

    const Layout =
        getRouteGroup(pathname) === CREW_ROUTE_GROUP ? CrewLayout : WorkLayout;

    return (
        <div className="flex-1 flex">
            <div className="w-96 border-r border-zinc-800 p-4 bg-black">
                <Panel />
            </div>
            <div className="flex-1 flex flex-col">
                <Layout>{children}</Layout>
            </div>
        </div>
    );
};

export default CrewWorkLayout;
