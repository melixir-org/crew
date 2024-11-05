import { supabaseBrowserClient } from '@/lib/supabase/browser';

export async function getCrews() {
    const data = await supabaseBrowserClient.from('crews').select('*');
    console.log(data);
}
