'use client';

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import RouteTabs from '../RouteTabs';
import WorkCreateDraftLayout from './WorkCreateDraftLayout';
import { WORK_ROUTE_GROUP_ROUTES } from '@/app/routes';
import CreateTitle from './CreateTitle';
import ReadUpdateTitle from './ReadUpdateTitle';
import { extractWorkId } from '@/lib/utils';

interface WorkLayoutProps {
    children: React.ReactNode;
}

const WorkLayout: React.FC<WorkLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const cw = searchParams.get('create_work') ?? '';

    const createWorkModeOn = cw === extractWorkId(pathname);

    return (
        <>
            <div className="my-5 mx-3 bg-primary-dark-bg">
                {createWorkModeOn ? <CreateTitle /> : <ReadUpdateTitle />}
            </div>
            <div className="mx-3 bg-primary-dark-bg">
                <RouteTabs routes={WORK_ROUTE_GROUP_ROUTES} />
                <div className="mt-6">{children}</div>
                <WorkCreateDraftLayout />
            </div>
        </>
    );
};

export default WorkLayout;
