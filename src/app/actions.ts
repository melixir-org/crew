'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_ROUTE, CALLBACK_ROUTE } from './routes';

export const logInSignUpWithGithub = async () => {
    const supabase = await createSupabaseServerClient();

    const referer = (await headers()).get('referer');

    if (referer) {
        const refererUrl = new URL(referer);
        const callbackUrl = new URL(CALLBACK_ROUTE.pathname, refererUrl.origin);

        refererUrl.searchParams.forEach((value, key) => {
            callbackUrl.searchParams.set(key, value);
        });

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: callbackUrl.toString(),
            },
        });

        if (data.url) {
            redirect(data.url); // use the redirect API for your server framework
        } else {
            return {
                success: false,
                message:
                    error?.message ?? 'Something went wrong, please retry!',
            };
        }
    }
};

export const logInSignUpWithGoogle = async () => {
    const supabase = await createSupabaseServerClient();

    const referer = (await headers()).get('referer');

    if (referer) {
        const refererUrl = new URL(referer);
        const callbackUrl = new URL(CALLBACK_ROUTE.pathname, refererUrl.origin);

        refererUrl.searchParams.forEach((value, key) => {
            callbackUrl.searchParams.set(key, value);
        });

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: callbackUrl.toString(),
            },
        });

        if (data.url) {
            redirect(data.url); // use the redirect API for your server framework
        } else {
            return {
                success: false,
                message:
                    error?.message ?? 'Something went wrong, please retry!',
            };
        }
    }
};

export const signOutAction = async () => {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    return redirect(AUTH_ROUTE.pathname);
};
