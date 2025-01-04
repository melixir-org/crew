import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Work } from '@/types/Work';

export async function getWorkWithCrewMetaData({ workId }: { workId: string }) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('works')
        .select('id, crew:crew_id (id, root_work:root_id (title, id))')
        .eq('id', workId)
        .returns<Work[]>()
        .single()
}
