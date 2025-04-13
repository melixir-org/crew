import { usePageStore } from '@/provider/PageStore';
import { assignWorkApi } from '@/lib/client-only-api';
import { Assignment, createAssignment } from '@/types/Assignment';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Button } from '@/components/ui/button';
import { Work } from '@/types/Work';

const AssignMyself = ({ workId }: { workId: string }) => {
    const {
        server: { works, user },
        setWork: setWorkPageStore,
    } = usePageStore(store => store);

    const work: Work = works[workId];

    const assignments: Assignment[] = work.assignments ?? [];

    const activeAssignments = assignments.filter(a => a.unassigned_at === null);

    const assignee = activeAssignments[0];

    const { setWork: setWorkCrewWorkLayoutStore } = useCrewWorkLayoutStore(
        store => store
    );

    async function assignWork() {
        const { data }: { data: Assignment | null } = await assignWorkApi(
            workId,
            user?.id ?? ''
        );

        if (data) {
            setWorkPageStore(workId, work => {
                const a = work.assignments ?? [];
                a.push(createAssignment({ ...data }));
                work.assignments = a;
            });

            setWorkCrewWorkLayoutStore(workId, work => {
                const a = work.assignments ?? [];
                a.push(createAssignment({ ...data }));
                work.assignments = a;
            });
        }
    }

    return assignee ? null : (
        <Button
            className="w-32 bg-white text-black hover:bg-white"
            onClick={assignWork}
        >
            Let&apos;s Go
        </Button>
    );
};

export default AssignMyself;
