'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import RouteTabs from './RouteTabs';
import { CREW_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import { usePageStore } from '@/provider/PageStore';

interface CrewPageProps {
    children: React.ReactNode;
}

const CrewPage: React.FC<CrewPageProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const crewTitle = usePageStore(state => {
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

export default CrewPage;
