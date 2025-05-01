import { createDbUser, DbUser } from './DbUser';
import { DeepPartial } from './DeepPartial';
import { createMember, Member } from './Member';
import { createWork, Work } from './Work';

export interface Crew {
    id: string;
    title: string;
    root_work?: Work;
    members?: Member[];
    social_link?: string | null;
    created_by?: DbUser;
}

export function createCrew({
    id = '',
    title = '',
    root_work,
    members,
    social_link,
    created_by,
}: DeepPartial<Crew> = {}): Crew {
    return {
        id,
        title,
        root_work: root_work ? createWork(root_work) : undefined,
        members: members?.map(m => createMember(m)),
        social_link,
        created_by: created_by ? createDbUser(created_by) : undefined,
    };
}
