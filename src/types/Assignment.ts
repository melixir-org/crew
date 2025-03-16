import { DeepPartial } from './DeepPartial';
import { createUser, User } from './User';

export interface Assignment {
    id: string;
    user: User;
    assigned_at: string;
    unassigned_at: string | null;
}

export function createAssignment({
    id = '',
    user,
    assigned_at = '',
    unassigned_at = null,
}: DeepPartial<Assignment> = {}): Assignment {
    return { id, user: createUser(user), assigned_at, unassigned_at };
}
