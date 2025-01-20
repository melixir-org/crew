import { DeepPartial } from './DeepPartial';
import { createWork, Work } from './Work';

export interface Crew {
    id: string;
    title: string;
    root_work?: Work;
}

export function createCrew({
    id = '',
    title = '',
    root_work,
}: DeepPartial<Crew> = {}): Crew {
    return {
        id,
        title,
        root_work: root_work ? createWork(root_work) : undefined,
    };
}
