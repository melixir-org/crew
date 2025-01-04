import 'client-only';

import { createBrowserClient } from '@supabase/ssr';

function createSupabaseBrowserClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}

export const supabaseBrowserClient = createSupabaseBrowserClient();
