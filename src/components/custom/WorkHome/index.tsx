'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { extractWorkId } from '@/lib/utils';
import CreateDescription from './CreateDescription';
import ReadUpdateDescription from './ReadUpdateDescription';
import Assignments from './Assignments';
import ReadUpdateStatus from './Status/ReadUpdateStatus';
import CreateStatus from './Status/CreateStatus';

const WorkHome = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const cw = searchParams.get('create_work') ?? '';

    const createWorkModeOn = cw === workId;

    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="w-[70%] flex justify-end gap-2">
                {createWorkModeOn ? <CreateStatus /> : <ReadUpdateStatus />}
                {/* {createWorkModeOn ? <CreateStatus /> : <ReadUpdateStatus />} */}
            </div>
            <div className="flex items-start gap-2">
                <div className="flex-[0_0_70%]">
                    {createWorkModeOn ? (
                        <CreateDescription />
                    ) : (
                        <ReadUpdateDescription />
                    )}
                </div>
                {!createWorkModeOn && (
                    <div className="flex-1">
                        <Assignments />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkHome;
