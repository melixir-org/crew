import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Work } from '@/types/Work';

export async function getWorks(pageIndex: number, pageSize: number) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('works')
        .select('id, title', { count: 'exact' })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .returns<Work[]>();
}

export async function getWorkDescAndContributors(workId: string) {
    const supabaseServerClient = await createSupabaseServerClient();
    return await supabaseServerClient
        .from('works')
        .select(
            `id, created_at, crew:crew_id (id, title), description, title, created_by, assignment (user_id:id, assigned_at, unassigned_at)`
        )
        .eq('id', workId)
        .returns<Work[]>()
        .single();
}
