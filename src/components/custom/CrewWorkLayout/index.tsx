'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { List, Network } from 'lucide-react';

import AncestorsPanel from './AncestorsPanel';
import CrewLayout from './CrewLayout';
import WorkLayout from './WorkLayout';
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

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex-1 p-1 flex">
            <div className="w-96 flex gap-1">
                <div className="flex-[1_1_0] p-1 rounded-lg bg-secondary-dark-bg flex flex-col gap-5">
                    <div className="flex-[1_1_0] flex flex-col gap-1">
                        <CrewCard />
                        {createCrewModeOn || (
                            <div
                                className="flex-[1_1_0] overflow-y-auto scrollbar-none"
                                ref={containerRef}
                            >
                                <AncestorsPanel containerRef={containerRef} />
                            </div>
                        )}
                    </div>
                    <div className="flex-[2_2_0] overflow-y-auto scrollbar-none">
                        {createCrewModeOn || <ChildrenPanel />}
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-3">
                    {createCrewModeOn || (
                        <>
                            <div className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg">
                                <Network className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg">
                                <List className="h-6 w-6 text-gray-400" />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex-1">
                <Layout>{children}</Layout>
            </div>
        </div>
    );
};

export default CrewWorkLayout;
