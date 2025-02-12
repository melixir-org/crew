import { usePathname } from 'next/navigation';

import FilledAssignment from './FilledAssignment';
import EmptyAssignment from './EmptyAssignment';
import { Assignment } from '@/types/Assignment';
import { Work } from '@/types/Work';
import { usePageStore } from '@/provider/PageStore';
import { extractWorkId } from '@/lib/utils';

const Assignments = () => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const {
        server: { works },
    } = usePageStore(store => store);

    const work: Work = works[workId];

    const assignments: Assignment[] = work.assignment ?? [];

    const activeAssignments = assignments.filter(a => a.unassigned_at === null);

    const assignee = activeAssignments[0];

    return (
        <>
            {assignee ? (
                <FilledAssignment
                    workId={workId}
                    type="Assignee"
                    assignment={assignee}
                />
            ) : (
                <EmptyAssignment workId={workId} type="Assignee" />
            )}
        </>
    );
};

export default Assignments;
