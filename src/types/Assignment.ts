import { DeepPartial } from './DeepPartial';

export interface Assignment {
    id: string;
    user_id: string;
    assigned_at: string;
}

export function createAssignment({
    id = '',
    user_id = '',
    assigned_at = '',
}: DeepPartial<Assignment> = {}): Assignment {
    return { id, user_id, assigned_at };
}
