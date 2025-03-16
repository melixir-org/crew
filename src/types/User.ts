import { DeepPartial } from './DeepPartial';

export interface User {
    id: string;
    email_id: string;
}

export function createUser({
    id = '',
    email_id = '',
}: DeepPartial<User> = {}): User {
    return { id, email_id };
}
