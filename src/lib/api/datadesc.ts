import { supabaseBrowserClient } from '../supabase/browser';

export async function getWorkData(workId: string) {
    return await supabaseBrowserClient
        .from('works')
        .select('title, created_at, description')
        .eq('id', workId);
}
