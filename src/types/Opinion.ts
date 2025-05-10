import { createDbUser, DbUser } from './DbUser';
import { DeepPartial } from './DeepPartial';

export interface Opinion {
    id: string;
    crew_id: string;
    created_at: string;
    created_by: DbUser;
    data: string;
    anonymous: boolean;
    reply_of?: Opinion | null;
}

export function createOpinion({
    id = '',
    crew_id = '',
    created_at = '',
    created_by,
    data = '',
    anonymous = false,
    reply_of = null,
}: DeepPartial<Opinion> = {}): Opinion {
    return {
        id,
        created_at,
        data,
        created_by: createDbUser(created_by),
        crew_id,
        anonymous,
        reply_of: reply_of ? createOpinion(reply_of) : null,
    };
}
