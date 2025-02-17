import { DeepPartial } from './DeepPartial';

export interface Member {
    id: string;
    user_id: string;
    joined_at: string;
    left_at: string | null;
}

export function createMember({
    id = '',
    user_id = '',
    joined_at = '',
    left_at = null,
}: DeepPartial<Member> = {}): Member {
    return { id, user_id, joined_at, left_at };
}
