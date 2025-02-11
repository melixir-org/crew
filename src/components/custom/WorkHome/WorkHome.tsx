'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { usePageStore } from '@/provider/PageStore';
import { updateStatusApi } from '@/lib/client-only-api/index';
import { Work } from '@/types/Work';
import {
    DONE,
    PLANNING,
    READY,
    REVIEW,
    TO_DO,
    WIP,
    WorkStatus,
} from '@/types/WorkStatus';
import { extractWorkId } from '@/lib/utils';
import CreateDescription from './CreateDescription';
import ReadUpdateDescription from './ReadUpdateDescription';
import Assignments from './Assignments/Assignments';

const WorkHome = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const {
        server: { works },
        setWork,
    } = usePageStore(store => store);

    const work: Work = works[workId];

    const updateStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as WorkStatus;
        try {
            await updateStatusApi(workId, status);
            setWork(workId, work => {
                work.status = status;
            });
        } catch {}
    };

    const cw = searchParams.get('create_work') ?? '';

    const createWorkModeOn = cw === workId;

    return (
        <div className="flex w-full bg-primary-dark-bg">
            <div className="flex flex-col bg-primary-dark-bg w-full pl-4">
                <div className="buttons">
                    <select
                        value={work.status ?? ''}
                        onChange={updateStatus}
                        className="rounded-md bg-primary-light-bg text-black py-4 px-2 text-md outline-none"
                    >
                        <option value={TO_DO}>{TO_DO}</option>
                        <option value={READY}>{READY}</option>
                        <option value={PLANNING}>{PLANNING}</option>
                        <option value={WIP}>{WIP}</option>
                        <option value={REVIEW}>{REVIEW}</option>
                        <option value={DONE}>{DONE}</option>
                    </select>
                    <br />
                    <br />
                </div>
                <div className="flex w-full">
                    <div className="bg-secondary-dark-bg border-dark-border border-[1px] rounded-lg p-4 w-8/12 gap-4">
                        <h2 className="text-primary-light-bg font-medium text-xl">
                            Description
                        </h2>
                        {createWorkModeOn ? (
                            <CreateDescription />
                        ) : (
                            <ReadUpdateDescription />
                        )}
                    </div>
                    <div className="pl-3 w-96">
                        <h2 className="text-primary-light-bg font-medium text-xl">
                            Assigned Contributors
                        </h2>
                        <Assignments />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkHome;
