import { Assignment, createAssignment } from './Assignment';
import { createCrew, Crew } from './Crew';
import { DeepPartial } from './DeepPartial';
import { WorkStatus } from './WorkStatus';

export interface Work {
    id: string;
    title: string;
    description?: string;
    crew?: Crew;
    assignment?: Assignment[];
    status?: WorkStatus;
}

export function createWork({
    id = '',
    title = '',
    description,
    crew,
    assignment,
    status,
}: DeepPartial<Work> = {}): Work {
    return {
        id,
        title,
        description,
        crew: crew ? createCrew(crew) : undefined,
        assignment: assignment
            ? assignment.map(a => createAssignment(a))
            : undefined,
        status,
    };
}
