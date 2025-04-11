import { usePageStore } from '@/provider/PageStore';
import { assignWorkApi } from '@/lib/client-only-api';
import { Assignment, createAssignment } from '@/types/Assignment';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Button } from '@/components/ui/button';

const EmptyAssignment = ({
    workId,
    type,
}: {
    workId: string;
    type: string;
}) => {
    const {
        server: { user },
        setWork: setWorkPageStore,
    } = usePageStore(store => store);
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

    return (
        <div className="p-2 bg-secondary-dark-bg rounded-lg flex flex-col gap-2">
            <div className="h-6 flex justify-between items-center">
                <h5 className="text-primary-light-bg text-xs">{type}</h5>
            </div>
            <div className="flex items-center justify-between gap-2">
                <span>no one</span>
                <Button
                    className="text-white"
                    variant="link"
                    size="sm"
                    onClick={assignWork}
                >
                    Assign Myself
                </Button>
            </div>
        </div>
    );
};

export default EmptyAssignment;
