import { DeepPartial } from './DeepPartial';
import { createMember, Member } from './Member';
import { createWork, Work } from './Work';

export interface Crew {
    id: string;
    title: string;
    root_work?: Work;
    members?: Member[];
}

export function createCrew({
    id = '',
    title = '',
    root_work,
    members,
}: DeepPartial<Crew> = {}): Crew {
    return {
        id,
        title,
        root_work: root_work ? createWork(root_work) : undefined,
        members: members ? members.map(m => createMember(m)) : undefined,
    };
}
