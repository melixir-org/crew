import { supabaseBrowserClient } from '@/lib/supabase/browser';

export async function getCrewMetaData({ workId }: { workId: string }) {
    return await supabaseBrowserClient
        .from('works')
        .select('crew:crew_id (id, root_work:root_id (title, id))')
        .eq('id', workId)
        .single();
}

export async function getCrews(pageIndex: number, pageSize: number) {
    return await supabaseBrowserClient
        .from('crews')
        .select('id, root_work:root_id(id, title)', { count: 'exact' })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1);
}
