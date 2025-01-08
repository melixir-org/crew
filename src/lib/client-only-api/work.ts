import 'client-only';

import { supabaseBrowserClient } from '@/lib/supabase/browser';
import { Work } from '@/types/Work';

export async function getWorks(pageIndex: number, pageSize: number) {
    const { data, error, count } = await supabaseBrowserClient
        .from('works')
        .select('id, title, crew:crew_id (id, title)', {
            count: 'exact',
        })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .returns<Work[]>();

    const totalPages = Math.ceil((count as number) / pageSize);
    return { ok: true, status: 200, data: data, totalPages: totalPages };
}

export async function getAncestors({
    workId,
    length,
}: {
    workId: string;
    length: number;
}) {
    return await supabaseBrowserClient
        .rpc('get_ancestors', {
            work_id: workId,
            length: length,
        })
        .returns<Work[]>();
}

export async function getWorkData(workId: string) {
    return await supabaseBrowserClient
        .from('works')
        .select('id, title, created_at, description, created_by')
        .eq('id', workId)
        .returns<Work[]>()
        .single();
}
