'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import AncestorsPanel from './AncestorsPanel';
import CrewLayout from './CrewLayout/CrewLayout';
import WorkLayout from './WorkLayout/WorkLayout';
import { CREW_ROUTE_GROUP } from '@/types/RouteGroup';
import { extractWorkId, getRouteGroup } from '@/lib/utils';
import ChildrenPanel from './ChildrenPanel';
import { NEW } from '@/lib/constants';
import CrewCard from './CrewCard';

interface CrewWorkLayoutProps {
    children: React.ReactNode;
}

const CrewWorkLayout: React.FC<CrewWorkLayoutProps> = ({ children }) => {
    const pathname = usePathname();

    const Layout =
        getRouteGroup(pathname) === CREW_ROUTE_GROUP ? CrewLayout : WorkLayout;

    const workId: string = extractWorkId(pathname);

    const createCrewModeOn = workId === NEW;

    return (
        <div className="flex-1 flex">
            <div className="min-w-96 border-r border-zinc-800 p-1 bg-black flex flex-col gap-2">
                <CrewCard />
                {createCrewModeOn || (
                    <div className="flex-[1_1_0]">
                        <AncestorsPanel />
                    </div>
                )}
                {createCrewModeOn || (
                    <div className="flex-[2_2_0]">
                        <ChildrenPanel />
                    </div>
                )}
            </div>
            <div className="flex-1">
                <Layout>{children}</Layout>
            </div>
        </div>
    );
};

export default CrewWorkLayout;
