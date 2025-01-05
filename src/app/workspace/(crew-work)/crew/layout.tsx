'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { CREW_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import RouteTabs from '@/components/custom/CrewWorkLayout/RouteTabs';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const crewTitle = useCrewWorkLayoutStore(state => {
        const show = searchParams.get('show') ?? '';
        // const title = state.works[show].crew?.root_work?.title;
        // return title ?? '';
        return 'title';
    });

    return (
        <>
            <div className="p-6">
                <h1
                    className="text-2xl font-bold tracking-tight text-white cursor-pointer"
                    onClick={handleRouteChange}
                >
                    {`${crewTitle} [X]`}
                </h1>
            </div>
            <div className="px-6">
                <RouteTabs routes={CREW_ROUTE_GROUP_ROUTES} />
                <div className="mt-6">{children}</div>
            </div>
        </>
    );
};

export default Layout;
