import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { Opinion } from '@/types/Opinion';
import { Item, UpvoterData } from '@/types/Upvoter';

export async function getUserApi() {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient.auth.getUser();
}

export async function getMyCrewsApi(pageIndex: number, pageSize: number) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('crews')
        .select(
            'id, title, root_work:root_id (id, title), created_by (id, username, name, avatar_url), total_members:members (count), total_opinions:opinions (count), votes:crew_votes (id, upvoted_at, removed_at, upvoted_by (id, username, name, avatar_url)), total_votes:crew_votes (count)',
            { count: 'exact' }
        )
        .eq('created_by', (await getUserApi()).data.user?.id ?? '')
        .is('total_members.left_at', null)
        .eq('votes.upvoted_by', (await getUserApi()).data.user?.id ?? '')
        .is('votes.removed_at', null)
        .is('total_votes.removed_at', null)
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .returns<Crew[]>();
}

export async function getWorkForCrewHomePageApi({
    workId,
}: {
    workId: string;
}) {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .from('works')
        .select(
            'id, title, crew:crew_id (id, title, social_link, root_work:root_id (id, title, description), members (id, user:user_id (id, username, name, avatar_url), joined_at, left_at))'
        )
        .eq('id', workId)
        .is('crew.members.left_at', null)
        .eq('crew.members.user_id', (await getUserApi()).data.user?.id ?? '')
        .returns<Work[]>()
        .single();
}

export async function getWorkForMembersPageApi({ workId }: { workId: string }) {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .from('works')
        .select(
            'id, title, crew:crew_id (id, title, members (id, user:user_id (id, username, name, avatar_url), joined_at, left_at))'
        )
        .eq('id', workId)
        .is('crew.members.left_at', null)
        .eq('crew.members.user_id', (await getUserApi()).data.user?.id ?? '')
        .returns<Work[]>()
        .single();
}

export async function getTheirCrewsApi(pageIndex: number, pageSize: number) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('crews')
        .select(
            'id, title, root_work:root_id (id, title), created_by (id, username, name, avatar_url), total_opinions:opinions (count), total_members:members (count), votes:crew_votes (id, upvoted_at, removed_at, upvoted_by (id, username, name, avatar_url)), total_votes:crew_votes (count)',
            { count: 'exact' }
        )
        .neq('created_by', (await getUserApi()).data.user?.id ?? '')
        .is('total_members.left_at', null)
        .eq('votes.upvoted_by', (await getUserApi()).data.user?.id ?? '')
        .is('votes.removed_at', null)
        .is('total_votes.removed_at', null)
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .returns<Crew[]>();
}

export async function getWorkForWorkHomePageApi({
    workId,
}: {
    workId: string;
}) {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .from('works')
        .select(
            `id, title, description, status, parent_id, crew:crew_id (id, title, members (id, user:user_id (id, username, name, avatar_url), joined_at, left_at)), assignments (id, user:user_id (id, username, name, avatar_url), assigned_at, unassigned_at)`
        )
        .eq('id', workId)
        .is('assignments.unassigned_at', null)
        .is('crew.members.left_at', null)
        .eq('crew.members.user_id', (await getUserApi()).data.user?.id ?? '')
        .returns<Work[]>()
        .single();
}

export async function getWorkMetaDataApi({ workId }: { workId: string }) {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .from('works')
        .select(
            `id, title, status, parent_id, assignments (id, user:user_id (id, username, name, avatar_url), assigned_at, unassigned_at)`
        )
        .eq('id', workId)
        .is('assignments.unassigned_at', null)
        .returns<Work[]>()
        .single();
}

export async function getWorkWhileCreateWorkForWorkHomePageApi({
    workId,
}: {
    workId: string;
}) {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .from('works')
        .select(`id, title, crew:crew_id (id, title)`)
        .eq('id', workId)
        .returns<Work[]>()
        .single();
}

export async function getOpinionsApi({
    crewId,
    scoreTimestamp,
}: {
    crewId: string;
    scoreTimestamp: string;
}) {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .rpc('get_opinions_by_score', {
            input_data: {
                crew_id: crewId,
                score_timestamp: scoreTimestamp,
                last_score: null,
                last_created_at: null,
            },
        })
        .returns<Opinion[]>();
}

// Upvoter APIs
export async function getUpvoterItemsApi() {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .rpc('get_upvotable_items')
        .returns<UpvoterData>();
}

export async function getUserItemApi() {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .from('upvoter_items')
        .select('*, upvotes:upvoter_votes (count)')
        .eq('created_by', (await getUserApi()).data.user?.id ?? '')
        .returns<Item[]>()
        .single();
}
