import { extractPathnameAfterWorkId } from '@/lib/utils';
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

const CreateStatus = () => {
    const pathname = usePathname();

    const pathnameAfterWorkId: string = extractPathnameAfterWorkId(pathname);

    const { getWorkCreateDraftRoute, setWorkCreateDraftRoute } =
        useCrewWorkLayoutStore(store => store);

    const status: string =
        getWorkCreateDraftRoute(pathnameAfterWorkId).work.status ?? '';

    return (
        <Select
            value={status}
            onValueChange={(status: WorkStatus) => {
                setWorkCreateDraftRoute(pathnameAfterWorkId, route => {
                    route.work.status = status;
                });
            }}
        >
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

export default CreateStatus;
