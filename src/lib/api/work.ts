import { supabaseBrowserClient } from "@/lib/supabase/browser";


export async function getWorks(page: number = 1, limit: number = 10) {
    try {
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        
        const countResponse = await supabaseBrowserClient.from('works')
            .select('*', { count: 'exact', head: true });

        const totalPages = Math.ceil(countResponse.count as number / limit);

        const { data, error } = await supabaseBrowserClient.from('works')
            .select('*')
            .range(from, to);

        if (error) throw error;

        return { ok : true, status : 200, data: data, totalPages: totalPages };
    } catch (error) {
        return { ok: false, status: 500, error: error };
    }
}
