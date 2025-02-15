'use client';

import { usePathname } from 'next/navigation';

import ReadUpdateDescription from './ReadUpdateDescription';
import CreateDescription from './CreateDescription';
import { extractWorkId } from '@/lib/utils';
import { NEW } from '@/lib/constants';

const CrewHome = () => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const crewCreateMode = workId === NEW;

    return (
        <div className="flex flex-col bg-primary-dark-bg w-full">
            <br />
            <div className="flex flex-col gap-3 bg-secondary-dark-bg rounded-lg p-4">
                <h2 className="text-primary-light-bg text-lg font-medium">
                    About The Crew
                </h2>
                {crewCreateMode ? (
                    <CreateDescription />
                ) : (
                    <ReadUpdateDescription />
                )}
            </div>
        </div>
    );
};

export default CrewHome;
