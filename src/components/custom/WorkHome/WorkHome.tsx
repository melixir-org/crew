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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const WorkHome = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const {
        server: { works },
        setWork,
    } = usePageStore(store => store);

    const work: Work = works[workId];

    const updateStatus = async (status: WorkStatus) => {
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
        <div className="flex flex-col gap-2">
            <div className="w-[70%] flex justify-end gap-2">
                <Select value={work.status ?? ''} onValueChange={updateStatus}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={TO_DO}>{TO_DO}</SelectItem>
                            <SelectItem value={READY}>{READY}</SelectItem>
                            <SelectItem value={PLANNING}>{PLANNING}</SelectItem>
                            <SelectItem value={WIP}>{WIP}</SelectItem>
                            <SelectItem value={REVIEW}>{REVIEW}</SelectItem>
                            <SelectItem value={DONE}>{DONE}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={work.status ?? ''} onValueChange={updateStatus}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={TO_DO}>{TO_DO}</SelectItem>
                            <SelectItem value={READY}>{READY}</SelectItem>
                            <SelectItem value={PLANNING}>{PLANNING}</SelectItem>
                            <SelectItem value={WIP}>{WIP}</SelectItem>
                            <SelectItem value={REVIEW}>{REVIEW}</SelectItem>
                            <SelectItem value={DONE}>{DONE}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-2">
                <div className="flex-[0_0_70%] bg-secondary-dark-bg border-dark-border border-[1px] rounded-lg p-4 w-8/12 gap-4">
                    <h2 className="text-primary-light-bg font-medium text-xl">
                        Description
                    </h2>
                    {createWorkModeOn ? (
                        <CreateDescription />
                    ) : (
                        <ReadUpdateDescription />
                    )}
                </div>
                <div className="flex-1">
                    <Assignments />
                </div>
            </div>
        </div>
    );
};

export default WorkHome;
