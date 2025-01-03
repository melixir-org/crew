import { supabaseBrowserClient } from '@/lib/supabase/browser';

export async function getWorks(page: number = 1, limit: number = 10) {
    try {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count:totalCount } = await supabaseBrowserClient
        .from('works')
        .select('*', { count: 'exact' })
        .range(from, to);
        
        const totalPages = Math.ceil((totalCount as number) / limit);

        if (error) throw error;

        return { ok: true, status: 200, data: data, totalPages: totalPages };
    } catch (error) {
        return { ok: false, status: 500, error: error };
    }
}

export async function getAncestors({
    workId,
    length,
}: {
    workId: string;
    length: number;
}) {
    return await supabaseBrowserClient.rpc('get_ancestors', {
        work_id: workId,
        length: length,
    });
}
