import { DeepPartial } from './DeepPartial';

export interface User {
    id: string;
    username: string;
    name: string;
}

export function createUser({
    id = '',
    username = '',
    name = '',
}: DeepPartial<User> = {}): User {
    return { id, username, name };
}
