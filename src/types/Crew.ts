import { createCrewVote, CrewVote } from './CrewVote';
import { createDbUser, DbUser } from './DbUser';
import { DeepPartial } from './DeepPartial';
import { createMember, Member } from './Member';
import { createOpinion, Opinion } from './Opinion';
import { createWork, Work } from './Work';

export interface Crew {
    id: string;
    title: string;
    root_work?: Work;
    members?: Member[];
    total_members?: { count: number }[];
    social_link?: string | null;
    created_by?: DbUser;
    opinions?: Opinion[];
    total_opinions?: { count: number }[];
    votes?: CrewVote[];
    total_votes?: { count: number }[];
}

export function createCrew({
    id = '',
    title = '',
    root_work,
    members,
    total_members,
    social_link,
    created_by,
    opinions,
    total_opinions,
    votes,
    total_votes,
}: DeepPartial<Crew> = {}): Crew {
    const tm = total_members?.[0]?.count;
    const to = total_opinions?.[0]?.count;
    const tcv = total_votes?.[0]?.count;

    return {
        id,
        title,
        root_work: root_work ? createWork(root_work) : undefined,
        members: members?.map(m => createMember(m)),
        total_members: tm ? [{ count: tm }] : undefined,
        social_link,
        created_by: created_by ? createDbUser(created_by) : undefined,
        opinions: opinions?.map(o => createOpinion(o)),
        total_opinions: to ? [{ count: to }] : undefined,
        votes: votes?.map(cv => createCrewVote(cv)),
        total_votes: tcv ? [{ count: tcv }] : undefined,
    };
}
