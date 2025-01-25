'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

import RouteTabs from '../RouteTabs';
import WorkCreateDraftLayout from './WorkCreateDraftLayout';
import { WORK_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import CreateTitle from './CreateTitle';
import ReadUpdateTitle from './ReadUpdateTitle';
import { extractWorkId } from '@/lib/utils';

interface WorkLayoutProps {
    children: React.ReactNode;
}

const WorkLayout: React.FC<WorkLayoutProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const cw = searchParams.get('create_work') ?? '';

    const createWorkModeOn = cw === extractWorkId(pathname);

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-[calc(100%-24rem)]">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        {createWorkModeOn ? (
                            <CreateTitle />
                        ) : (
                            <ReadUpdateTitle />
                        )}
                    </div>
                    {createWorkModeOn || (
                        <div
                            className="m-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                            onClick={handleRouteChange}
                        >
                            <X className="h-7 w-7 text-gray-400" />
                        </div>
                    )}
                </div>
                <RouteTabs routes={WORK_ROUTE_GROUP_ROUTES} />
            </div>
            <div>{children}</div>
            <WorkCreateDraftLayout />
        </div>
    );
};

export default WorkLayout;
