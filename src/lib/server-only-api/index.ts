import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';

export async function getWorkWithCrewMetaData({ workId }: { workId: string }) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('works')
        .select('id, title, crew:crew_id (id, title)')
        .eq('id', workId)
        .returns<Work[]>()
        .single();
}

export async function getCrews(pageIndex: number, pageSize: number) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('crews')
        .select('id, title, root_work:root_id (id, title)', { count: 'exact' })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .returns<Crew[]>();
}

export async function getWorkForCrewHomePage({ workId }: { workId: string }) {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .from('works')
        .select(
            'id, title, crew:crew_id (id, title, root_work:root_id (id, title, description))'
        )
        .eq('id', workId)
        .returns<Work[]>()
        .single();
}

import 'server-only';

export async function getWorks(pageIndex: number, pageSize: number) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('works')
        .select('id, title', { count: 'exact' })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .returns<Work[]>();
}

export async function getWorkForWorkHomePage({ workId }: { workId: string }) {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .from('works')
        .select(
            `id, title, description, crew:crew_id (id, title), assignment (id, user_id, assigned_at)`
        )
        .eq('id', workId)
        .is('assignment.unassigned_at', null)
        .returns<Work[]>()
        .single();
}
