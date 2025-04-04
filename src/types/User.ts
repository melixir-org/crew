import { DeepPartial } from './DeepPartial';

export interface User {
    id: string;
    username: string;
    name: string;
    avatar_url: string;
}

export function createUser({
    id = '',
    username = '',
    name = '',
    avatar_url = '',
}: DeepPartial<User> = {}): User {
    return { id, username, name, avatar_url };
}
