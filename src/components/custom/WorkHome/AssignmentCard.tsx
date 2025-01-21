import { unassignApi } from '@/lib/client-only-api';
import { extractWorkId, getFormattedTime, getRelativeTime } from '@/lib/utils';
import { usePageStore } from '@/provider/PageStore';
import { Assignment } from '@/types/Assignment';
import { usePathname } from 'next/navigation';

interface AssignmentCardProps {
    data: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ data }) => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const { setWork } = usePageStore(store => store);

    const time = getRelativeTime(data.assigned_at);

    const unassign = async () => {
        const assingment_id = data.id;
        const currentTime = getFormattedTime();
        await unassignApi(assingment_id, currentTime);
        setWork(workId, work => {
            work.assignment = work.assignment?.filter(
                assignment => assignment.unassigned_at !== null
            );
        });
    };

    return (
        <div className="w-full p-3 bg-secondary-dark-bg border-[1px] border-dark-border rounded-lg flex flex-col gap-1 mt-1">
            <div className="flex justify-between items-center">
                <h5 className="text-primary-light-bg text-xs">Assigned To</h5>
                <h6 className="px-2 py-[1px] border-[1px] rounded-[54px] border-dark-border text-xs font-medium">
                    {time}
                </h6>
            </div>
            <div className="name">{data.user_id}</div>
            <button
                className="border-[1px] border-dark-border text-xs font-medium py-[1px] px-2 rounded-md"
                onClick={unassign}
            >
                Unassign
            </button>
        </div>
    );
};

export default AssignmentCard;
