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
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';

const ReadUpdateStatus = () => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const {
        server: { works },
        setWork: setWorkPageStore,
    } = usePageStore(store => store);

    const { setWork: setWorkCrewWorkLayoutStore } = useCrewWorkLayoutStore(
        store => store
    );

    const work: Work = works[workId];

    const updateStatus = async (status: WorkStatus) => {
        try {
            const { data }: { data: Work | null } = await updateStatusApi(
                workId,
                status
            );

            if (data) {
                setWorkPageStore(workId, work => {
                    work.status = data.status;
                });

                setWorkCrewWorkLayoutStore(workId, work => {
                    work.status = data.status;
                });
            }
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
