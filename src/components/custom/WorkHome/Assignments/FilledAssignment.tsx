import { unassignWorkApi } from '@/lib/client-only-api';
import { hasWorkUpdatePermission } from '@/lib/utils';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { usePageStore } from '@/provider/PageStore';
import { Assignment, createAssignment } from '@/types/Assignment';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';

const FilledAssignment = ({
    workId,
    type,
    assignment,
}: {
    workId: string;
    type: string;
    assignment: Assignment;
}) => {
    const {
        server: { crews, works, user },
        setWork: setWorkPageStore,
    } = usePageStore(store => store);

    const { setWork: setWorkCrewWorkLayoutStore } = useCrewWorkLayoutStore(
        store => store
    );

    async function unassignWork() {
        const { data }: { data: Assignment | null } = await unassignWorkApi(
            workId,
            assignment.user.id
        );

        if (data) {
            setWorkPageStore(workId, work => {
                const a = work.assignments ?? [];

                const index = a.findIndex(t => t.id === data.id);
                if (index === -1) {
                    a.push(createAssignment({ ...data }));
                } else {
                    a[index] = createAssignment({ ...data });
                }

                work.assignments = a;
            });

            setWorkCrewWorkLayoutStore(workId, work => {
                const a = work.assignments ?? [];

                const index = a.findIndex(t => t.id === data.id);
                if (index === -1) {
                    a.push(createAssignment({ ...data }));
                } else {
                    a[index] = createAssignment({ ...data });
                }

                work.assignments = a;
            });
        }
    }

    const assignedAt = new Date(assignment.assigned_at);

    const work: Work = works[workId];

    const parentWork: Work | undefined = work.parent_id
        ? works[work.parent_id]
        : undefined;

    const crewId = work.crew?.id ?? '';

    const crew: Crew = crews[crewId];

    return (
        <div className="p-2 bg-secondary-dark-bg rounded-lg flex flex-col gap-1">
            <div className="flex justify-between items-center">
                <h5 className="text-primary-light-bg text-xs">{type}</h5>
                <h6 className="py-[2px] px-2 border-[1px] rounded-[54px] border-dark-border text-xs">
                    {`${assignedAt
                        .toUTCString()
                        .slice(
                            0,
                            16
                        )} ${assignedAt.getUTCHours()}:${assignedAt.getUTCMinutes()} GMT`}
                </h6>
            </div>
            <div>{assignment.user.username}</div>
            {hasWorkUpdatePermission(user, crew, work, parentWork) && (
                <button
                    className="border-[1px] border-dark-border text-xs font-medium py-[1px] px-2 rounded-md"
                    onClick={() => unassignWork()}
                >
                    Unassign
                </button>
            )}
        </div>
    );
};

export default FilledAssignment;
