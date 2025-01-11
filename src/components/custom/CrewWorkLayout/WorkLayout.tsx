'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import RouteTabs from './RouteTabs';
import WorkCreateDraftLayout from './WorkCreateDraftLayout';
import { WORK_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';

interface WorkLayoutProps {
    children: React.ReactNode;
}

const WorkLayout: React.FC<WorkLayoutProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const workTitle: string = useCrewWorkLayoutStore(store => {
        const show = searchParams.get('show') ?? '';
        return store.server.works[show]?.title ?? '';
    });

    return (
        <>
            <div className="p-6 bg-primary-dark-bg">
                <h1
                    className="text-2xl font-bold tracking-tight text-primary-light-bg bg-primary-dark-bg cursor-pointer"
                    onClick={handleRouteChange}
                >
                    {`${workTitle} [X]`}
                </h1>
            </div>
            <div className="px-6 bg-primary-dark-bg">
                <RouteTabs routes={WORK_ROUTE_GROUP_ROUTES} />
                <div className="mt-6">{children}</div>
                <WorkCreateDraftLayout />
            </div>
        </>
    );
};

export default WorkLayout;
