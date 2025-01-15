import { Assignment } from './Assignment';
import { Crew } from './Crew';
import { WorkStatus } from './WorkStatus';

export interface Work {
    id: string;
    title: string;
    description?: string;
    crew?: Crew;
    assignment?: Assignment[];
    status?: WorkStatus;
}

export function createWork(
    id: string = '',
    title: string = '',
    description?: string,
    crew?: Crew,
    assignment?: Assignment[],
    status?: WorkStatus
): Work {
    return { id, title, description, crew, assignment, status };
}
