import { DeepPartial } from './DeepPartial';
import { createUser, User } from './User';

export interface Member {
    id: string;
    user: User;
    joined_at: string;
    left_at: string | null;
}

export function createMember({
    id = '',
    user,
    joined_at = '',
    left_at = null,
}: DeepPartial<Member> = {}): Member {
    return { id, user: createUser(user), joined_at, left_at };
}
