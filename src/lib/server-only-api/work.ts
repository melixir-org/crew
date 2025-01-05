import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Work } from '@/types/Work';

export async function getWorks(pageIndex: number, pageSize: number) {
    const supabaseServerClient = await createSupabaseServerClient();

    return await supabaseServerClient
        .from('works')
        .select('id,title, description,', { count: 'exact' })
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .returns<Work[]>();
}
