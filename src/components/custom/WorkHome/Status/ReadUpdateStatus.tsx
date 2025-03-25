import { updateStatusApi } from '@/lib/client-only-api';
import { extractWorkId } from '@/lib/utils';
import { usePageStore } from '@/provider/PageStore';
import { Work } from '@/types/Work';
import { usePathname } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    CLOSED,
    DONE,
    PLANNING,
    READY,
    REVIEW,
    TO_DO,
    WIP,
    WorkStatus,
} from '@/types/WorkStatus';

const ReadUpdateStatus = () => {
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

    return (
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
                    <SelectItem value={CLOSED}>{CLOSED}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ReadUpdateStatus;
