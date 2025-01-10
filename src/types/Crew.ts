import { Work } from './Work';

export interface Crew {
    id: string;
    title: string;
    root_work?: Work;
}

export function createCrew(
    id: string = '',
    title: string = '',
    root_work?: Work
) {
    return { id, title, root_work };
}
