import getRelativeTime from '@/lib/client-only-api/datatime';

interface AssignmentCardProps {
    data: any;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ data }) => {
    const time = getRelativeTime(data.assigned_at);
    return data ? (
        <div className="w-full p-3 bg-secondary-dark-bg border-[1px] border-dark-border rounded-lg flex flex-col gap-1 mt-1">
            <div className="flex justify-between items-center">
                <h5 className="text-primary-light-bg text-xs">Assigned To</h5>
                <h6 className="px-2 py-[1px] border-[1px] rounded-[54px] border-dark-border text-xs font-medium">
                    {time}
                </h6>
            </div>
            <div className="name">{data.user_id}</div>
        </div>
    ) : (
        <></>
    );
};

export default AssignmentCard;
