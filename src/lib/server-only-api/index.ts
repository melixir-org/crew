import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';

export async function getValidatedUserApi() {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient.auth.getUser();
}

export async function getUserApi() {
    const supabaseServerClient = await createSupabaseServerClient();

    const { data, ...rest } = await supabaseServerClient.auth.getSession();

    return { data: { user: data.session?.user ?? null }, ...rest };
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
            'id, title, crew:crew_id (id, title, root_work:root_id (id, title, description), members (id, user:user_id (id, username, name, avatar_url), joined_at, left_at))'
        )
        .eq('id', workId)
        .is('crew_id.members.left_at', null)
        .eq('crew_id.members.user_id', (await getUserApi()).data.user?.id ?? '')
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
        .is('crew_id.members.left_at', null)
        .eq('crew_id.members.user_id', (await getUserApi()).data.user?.id ?? '')
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
            `id, title, description, status, parent_id, crew:crew_id (id, title, members (id, user:user_id (id, username, name, avatar_url), joined_at, left_at)), assignments (id, user:user_id (id, username, name, avatar_url), assigned_at, unassigned_at)`
        )
        .eq('id', workId)
        .is('assignments.unassigned_at', null)
        .is('crew_id.members.left_at', null)
        .eq('crew_id.members.user_id', (await getUserApi()).data.user?.id ?? '')
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
