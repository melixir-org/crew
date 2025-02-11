import { unassignWorkApi } from '@/lib/client-only-api';
import { usePageStore } from '@/provider/PageStore';
import { Assignment, createAssignment } from '@/types/Assignment';

const FilledAssignment = ({
    workId,
    type,
    assignment,
}: {
    workId: string;
    type: string;
    assignment: Assignment;
}) => {
    const { setWork } = usePageStore(store => store);

    async function unassignWork() {
        const { data }: { data: Assignment | null } = await unassignWorkApi(
            workId,
            assignment.user_id
        );

        setWork(workId, work => {
            const a = work.assignment ?? [];

            const index = a.findIndex(t => t.id === assignment.id);
            if (index === -1) {
                a.push(createAssignment({ ...data }));
            } else {
                a[index] = createAssignment({ ...data });
            }

            work.assignment = a;
        });
    }

    const assignedAt = new Date(assignment.assigned_at);

    return (
        <div className="w-full p-3 bg-secondary-dark-bg border-[1px] border-dark-border rounded-lg flex flex-col gap-1 mt-1">
            <div className="flex justify-between items-center">
                <h5 className="text-primary-light-bg text-xs">{type}</h5>
                <h6 className="px-2 py-[1px] border-[1px] rounded-[54px] border-dark-border text-xs font-medium">
                    {assignedAt.toUTCString()}
                </h6>
            </div>
            <div className="name">{assignment.user_id}</div>
            <button
                className="border-[1px] border-dark-border text-xs font-medium py-[1px] px-2 rounded-md"
                onClick={unassignWork}
            >
                Unassign
            </button>
        </div>
    );
};

export default FilledAssignment;
