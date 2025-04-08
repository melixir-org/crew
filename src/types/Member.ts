import { DeepPartial } from './DeepPartial';
import { createDbUser, DbUser } from './DbUser';

export interface Member {
    id: string;
    user: DbUser;
    joined_at: string;
    left_at: string | null;
}

export function createMember({
    id = '',
    user,
    joined_at = '',
    left_at = null,
}: DeepPartial<Member> = {}): Member {
    return { id, user: createDbUser(user), joined_at, left_at };
}
