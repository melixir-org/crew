'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CrewCreateDraftLayout from './CrewCreateDraftLayout';
import RouteTabs from '../RouteTabs';
import { CREW_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import { extractWorkId } from '@/lib/utils';
import { NEW } from '@/lib/constants';
import CreateTitle from './CreateTitle';
import ReadUpdateTitle from './ReadUpdateTitle';
import { X } from 'lucide-react';

interface CrewLayoutProps {
    children: React.ReactNode;
}

const CrewLayout: React.FC<CrewLayoutProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);
    const crewCreateModeOn = workId === NEW;

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    return (
        <div className="p-1 flex flex-col gap-2">
            <div className="flex flex-col gap-4 w-[70%]">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        {crewCreateModeOn ? (
                            <CreateTitle />
                        ) : (
                            <ReadUpdateTitle />
                        )}
                    </div>
                    {crewCreateModeOn || (
                        <div
                            className="m-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                            onClick={handleRouteChange}
                        >
                            <X className="h-7 w-7 text-gray-400" />
                        </div>
                    )}
                </div>
                <RouteTabs routes={CREW_ROUTE_GROUP_ROUTES} />
            </div>
            {children}
            <div className="w-[70%]">
                <CrewCreateDraftLayout />
            </div>
        </div>
    );
};

export default CrewLayout;
