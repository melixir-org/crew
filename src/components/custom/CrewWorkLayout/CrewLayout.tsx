'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import CrewCreateDraftLayout from './CrewCreateDraftLayout';
import RouteTabs from './RouteTabs';
import { CREW_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';

interface CrewLayoutProps {
    children: React.ReactNode;
}

const CrewLayout: React.FC<CrewLayoutProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const crewTitle: string = useCrewWorkLayoutStore(state => {
        const show = searchParams.get('show') ?? '';
        return state.works[show]?.crew?.title ?? '';
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
                <CrewCreateDraftLayout />
            </div>
        </>
    );
};

export default CrewLayout;
