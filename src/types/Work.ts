import { Assignment, createAssignment } from './Assignment';
import { createCrew, Crew } from './Crew';
import { DeepPartial } from './DeepPartial';
import { WorkStatus } from './WorkStatus';

export interface Work {
    id: string;
    title: string;
    description?: string;
    parent_id?: string | null;
    crew?: Crew;
    assignments?: Assignment[];
    status?: WorkStatus;
}

export function createWork({
    id = '',
    title = '',
    description,
    parent_id,
    crew,
    assignments,
    status,
}: DeepPartial<Work> = {}): Work {
    return {
        id,
        title,
        description,
        parent_id,
        crew: crew ? createCrew(crew) : undefined,
        assignments: assignments?.map(a => createAssignment(a)),
        status,
    };
}
