import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';

export async function getValidatedUserApi() {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient.auth.getUser();
}

export async function getCrewsApi(pageIndex: number, pageSize: number) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('crews')
        .select('id, title, root_work:root_id (id, title)', { count: 'exact' })
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
            'id, title, crew:crew_id (id, title, root_work:root_id (id, title, description), members (id, user_id, joined_at, left_at))'
        )
        .eq('id', workId)
        .is('crew_id.members.left_at', null)
        .eq(
            'crew_id.members.user_id',
            (await supabaseServerClient.auth.getUser()).data.user?.id ?? ''
        )
        .returns<Work[]>()
        .single();
}

export async function getWorksApi(pageIndex: number, pageSize: number) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('works')
        .select('id, title', { count: 'exact' })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .returns<Work[]>();
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
            `id, title, description, status, crew:crew_id (id, title, members (id, user_id, joined_at, left_at)), assignment:assignments (id, user_id, assigned_at, unassigned_at)`
        )
        .eq('id', workId)
        .is('assignments.unassigned_at', null)
        .is('crew_id.members.left_at', null)
        .eq(
            'crew_id.members.user_id',
            (await supabaseServerClient.auth.getUser()).data.user?.id ?? ''
        )
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
        .select(
            `id, title, crew:crew_id (id, title), assignment:assignments (id, user_id, assigned_at, unassigned_at)`
        )
        .eq('id', workId)
        .returns<Work[]>()
        .single();
}
