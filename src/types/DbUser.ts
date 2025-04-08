import { DeepPartial } from './DeepPartial';

export interface DbUser {
    id: string;
    username: string;
    name: string;
    avatar_url: string;
}

export function createDbUser({
    id = '',
    username = '',
    name = '',
    avatar_url = '',
}: DeepPartial<DbUser> = {}): DbUser {
    return { id, username, name, avatar_url };
}
