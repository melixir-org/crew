import { DeepPartial } from './DeepPartial';
import { createDbUser, DbUser } from './DbUser';

export interface Assignment {
    id: string;
    user: DbUser;
    assigned_at: string;
    unassigned_at: string | null;
}

export function createAssignment({
    id = '',
    user,
    assigned_at = '',
    unassigned_at = null,
}: DeepPartial<Assignment> = {}): Assignment {
    return { id, user: createDbUser(user), assigned_at, unassigned_at };
}
