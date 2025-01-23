'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AlignLeft, List, ListTree, Network } from 'lucide-react';

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
        <div className="flex-1 p-1 flex">
            <div className="min-w-96 flex gap-1">
                <div className="flex-[1_1_0] p-1 rounded-lg bg-secondary-dark-bg flex flex-col gap-5">
                    <CrewCard />
                    {createCrewModeOn || (
                        <div className="flex-[2_2_0] overflow-y-auto scrollbar-none">
                            <AncestorsPanel />
                        </div>
                    )}
                    {createCrewModeOn || (
                        <div className="flex-[5_5_0] overflow-y-auto scrollbar-none">
                            <ChildrenPanel />
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center gap-3">
                    <div className="p-1 self-center cursor-pointer hover:bg-gray-100 rounded-lg">
                        <ListTree className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="p-1 self-center cursor-pointer hover:bg-gray-100 rounded-lg">
                        <List className="h-6 w-6 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <Layout>{children}</Layout>
            </div>
        </div>
    );
};

export default CrewWorkLayout;
