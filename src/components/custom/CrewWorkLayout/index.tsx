'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { List, Network } from 'lucide-react';
import CrewLayout from './CrewLayout';
import WorkLayout from './WorkLayout';
import { CREW_ROUTE_GROUP } from '@/types/RouteGroup';
import { extractWorkId, getRouteGroup } from '@/lib/utils';
import { HIERARCHY, LIST, NEW } from '@/lib/constants';
import HierarchyPanel from './HierarchyPanel';
import PersistentMountDiv from '../PersistentMountDiv';
import ListPanel from './ListPanel';

interface CrewWorkLayoutProps {
    children: React.ReactNode;
}

const CrewWorkLayout: React.FC<CrewWorkLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const panel = searchParams.get('panel') ?? HIERARCHY;

    const Layout =
        getRouteGroup(pathname) === CREW_ROUTE_GROUP ? CrewLayout : WorkLayout;

    const workId: string = extractWorkId(pathname);

    const createCrewModeOn = workId === NEW;

    function handlePanelChange(panel: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('panel', panel);
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex-1 p-1 flex">
            <div className="w-96 flex gap-1">
                <PersistentMountDiv
                    show={panel === HIERARCHY || createCrewModeOn}
                    className="flex-1 p-1 rounded-lg bg-secondary-dark-bg flex flex-col gap-5"
                >
                    <HierarchyPanel />
                </PersistentMountDiv>
                <PersistentMountDiv
                    show={panel === LIST && !createCrewModeOn}
                    className="flex-1 p-1 rounded-lg bg-secondary-dark-bg"
                >
                    <ListPanel />
                </PersistentMountDiv>
                <div className="flex flex-col justify-center gap-3">
                    {createCrewModeOn || (
                        <>
                            <div
                                className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                                onClick={e => {
                                    e.stopPropagation();
                                    handlePanelChange(HIERARCHY);
                                }}
                            >
                                <Network className="h-6 w-6 text-gray-400" />
                            </div>
                            <div
                                className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                                onClick={e => {
                                    e.stopPropagation();
                                    handlePanelChange(LIST);
                                }}
                            >
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
