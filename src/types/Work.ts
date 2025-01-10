import { Assignment } from './Assignment';
import { Crew } from './Crew';

export interface Work {
    id: string;
    title: string;
    description?: string;
    crew?: Crew;
    assignment?: Assignment[];
}

export function createWork(
    id: string = '',
    title: string = '',
    description?: string,
    crew?: Crew,
    assignment?: Assignment[]
) {
    return { id, title, description, crew, assignment };
}
