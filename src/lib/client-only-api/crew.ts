import 'client-only';

import { supabaseBrowserClient } from '@/lib/supabase/browser';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';

export async function getWorkWithCrewMetaData({ workId }: { workId: string }) {
    return await supabaseBrowserClient
        .from('works')
        .select('id, crew:crew_id (id, root_work:root_id (title, id))')
        .eq('id', workId)
        .returns<Work[]>()
        .single();
}

export async function getCrews(pageIndex: number, pageSize: number) {
    return await supabaseBrowserClient
        .from('crews')
        .select('id, root_work:root_id(id, title)', { count: 'exact' })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .returns<Crew[]>();
}
