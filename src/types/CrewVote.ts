import { createDbUser, DbUser } from './DbUser';
import { DeepPartial } from './DeepPartial';

export const CREW_VOTE_ACTION_UPVOTE = 'upvote';
export const CREW_VOTE_ACTION_REMOVE = 'remove';

export type CrewVoteAction =
    | typeof CREW_VOTE_ACTION_UPVOTE
    | typeof CREW_VOTE_ACTION_REMOVE;

export interface CrewVote {
    id: string;
    crew_id: string;
    upvoted_at: string;
    removed_at: string | null;
    upvoted_by: DbUser;
}

export function createCrewVote({
    id = '',
    crew_id = '',
    upvoted_at = '',
    removed_at = null,
    upvoted_by,
}: DeepPartial<CrewVote> = {}): CrewVote {
    return {
        id,
        crew_id,
        upvoted_at,
        removed_at,
        upvoted_by: createDbUser(upvoted_by),
    };
}
