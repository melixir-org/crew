import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
        <div className="p-2 bg-secondary-dark-bg rounded-lg flex flex-col gap-2">
            <div className="h-6 flex justify-between items-center">
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
            <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                    <Avatar className="h-6 w-6">
                        {assignment.user &&
                            (assignment.user.avatar_url ? (
                                <AvatarImage src={assignment.user.avatar_url} />
                            ) : (
                                <AvatarFallback className="bg-gray-100">
                                    <span className="text-xs">
                                        {assignment.user.name
                                            .split(' ')
                                            .map(t => t[0].toUpperCase())
                                            .join('')
                                            .slice(0, 2)}
                                    </span>
                                </AvatarFallback>
                            ))}
                    </Avatar>
                    <span>{assignment.user.username}</span>
                </div>
                {hasWorkUpdatePermission(user, crew, work, parentWork) && (
                    <Button
                        className="text-white"
                        variant="link"
                        size="sm"
                        onClick={() => unassignWork()}
                    >
                        Unassign
                    </Button>
                )}
            </div>
        </div>
    );
};

export default FilledAssignment;
