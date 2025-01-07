'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import RouteTabs from './RouteTabs';
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

    const workTitle = useCrewWorkLayoutStore(state => {
        const show = searchParams.get('show') ?? '';
        // return show ? state.works[show].title : '';
        return 'title';
    });

    return (
        <>
            <div className="p-6">
                <h1
                    className="text-2xl font-bold tracking-tight text-white cursor-pointer"
                    onClick={handleRouteChange}
                >
                    {`${workTitle} [X]`}
                </h1>
            </div>
            <div className="px-6">
                <RouteTabs routes={WORK_ROUTE_GROUP_ROUTES} />
                <div className="mt-6">{children}</div>
            </div>
        </>
    );
};

export default WorkLayout;
