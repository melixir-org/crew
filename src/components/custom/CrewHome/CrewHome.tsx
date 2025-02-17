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
        <div className="flex items-start gap-2">
            <div className="flex-[0_0_70%]">
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
