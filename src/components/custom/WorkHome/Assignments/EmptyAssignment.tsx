import { usePageStore } from '@/provider/PageStore';
import { assignWorkApi } from '@/lib/client-only-api';
import { Assignment, createAssignment } from '@/types/Assignment';
import { supabaseBrowserClient } from '@/lib/supabase/browser';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';

const EmptyAssignment = ({
    workId,
    type,
}: {
    workId: string;
    type: string;
}) => {
    const { setWork: setWorkPageStore } = usePageStore(store => store);
    const { setWork: setWorkCrewWorkLayoutStore } = useCrewWorkLayoutStore(
        store => store
    );

    async function assignWork() {
        const { data }: { data: Assignment | null } = await assignWorkApi(
            workId,
            (await supabaseBrowserClient.auth.getUser()).data.user?.id ?? ''
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
        <div className="p-3 bg-secondary-dark-bg rounded-lg flex flex-col gap-1">
            <div className="flex justify-between items-center">
                <h5 className="text-primary-light-bg text-xs">{type}</h5>
            </div>
            <button
                className="border-[1px] border-dark-border text-xs font-medium py-[1px] px-2 rounded-md"
                onClick={assignWork}
            >
                Assign myself
            </button>
        </div>
    );
};

export default EmptyAssignment;
