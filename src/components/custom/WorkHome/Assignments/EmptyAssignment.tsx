import { usePageStore } from '@/provider/PageStore';
import { assignWorkApi } from '@/lib/client-only-api';
import { Assignment, createAssignment } from '@/types/Assignment';
import { supabaseBrowserClient } from '@/lib/supabase/browser';

const EmptyAssignment = ({
    workId,
    type,
}: {
    workId: string;
    type: string;
}) => {
    const { setWork } = usePageStore(store => store);

    async function assignWork() {
        const { data }: { data: Assignment | null } = await assignWorkApi(
            workId,
            (await supabaseBrowserClient.auth.getUser()).data.user?.id ?? ''
        );

        setWork(workId, work => {
            const a = work.assignment ?? [];
            a.push(createAssignment({ ...data }));
            work.assignment = a;
        });
    }

    return (
        <div className="w-full p-3 bg-secondary-dark-bg border-[1px] border-dark-border rounded-lg flex flex-col gap-1 mt-1">
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
