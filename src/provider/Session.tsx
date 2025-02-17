import { useEffect } from 'react';
import { User } from '@supabase/supabase-js';

import { usePageStore } from './PageStore';
import { supabaseBrowserClient } from '@/lib/supabase/browser';

export default function Session({
    callback,
}: {
    callback?: (user: User | null) => void;
}) {
    const { setServer } = usePageStore(store => store);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabaseBrowserClient.auth.onAuthStateChange((_event, session) => {
            const user: User | null = session?.user ?? null;
            setServer(server => {
                server.user = user;
            });
            callback?.(user);
        });

        return () => subscription.unsubscribe();
    }, []);

    return null;
}
