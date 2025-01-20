'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import CrewCreateDraftLayout from './CrewCreateDraftLayout';
import RouteTabs from '../RouteTabs';
import { CREW_ROUTE_GROUP_ROUTES } from '@/app/routes';
import { extractWorkId } from '@/lib/utils';
import { NEW } from '@/lib/constants';
import CreateTitle from './CreateTitle';
import ReadUpdateTitle from './ReadUpdateTitle';

interface CrewLayoutProps {
    children: React.ReactNode;
}

const CrewLayout: React.FC<CrewLayoutProps> = ({ children }) => {
    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);
    const crewCreateMode = workId === NEW;

    return (
        <>
            <div className="p-6">
                {crewCreateMode ? <CreateTitle /> : <ReadUpdateTitle />}
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
