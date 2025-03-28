'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData): Promise<void> => {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const supabase = await createSupabaseServerClient();
    const origin = (await headers()).get('origin');

    if (!email || !password) {
        return;
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/callback`,
        },
    });

    if (error) {
        return redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/login');
};

export const logInActionGithub = async () => {
    const supabase = await createSupabaseServerClient();
    const origin = (await headers()).get('origin');

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${origin}/protected`,
        },
    });

    if (error) {
        return {
            success: false,
            message: error.message,
        };
    }

    if (data.url) {
        redirect(data.url); // use the redirect API for your server framework
    } else {
        redirect('/protected');
    }
};

export const logInActionGoogle = async () => {
    const supabase = await createSupabaseServerClient();
    const origin = (await headers()).get('origin');

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/protected`,
        },
    });

    if (error) {
        return {
            success: false,
            message: error.message,
        };
    }

    if (data.url) {
        redirect(data.url); // use the redirect API for your server framework
    } else {
        redirect('/protected');
    }
};

export const logInAction = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return {
            success: false,
            message: error.message,
        };
    }

    return redirect('/protected');
};

export const forgotPasswordAction = async (formData: FormData) => {
    const email = formData.get('email')?.toString();
    const supabase = await createSupabaseServerClient();
    const origin = (await headers()).get('origin');
    const callbackUrl = formData.get('callbackUrl')?.toString();

    if (!email) {
        return {
            success: false,
            message: 'Email is required!',
        };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/callback?next=/protected/reset-password`,
    });

    if (error) {
        return {
            success: false,
            message: 'Could not reset password',
        };
    }

    if (callbackUrl) {
        return redirect(callbackUrl);
    }

    return {
        success: true,
        message: 'Check your email for a link to reset your password.',
    };
};

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = await createSupabaseServerClient();

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!password || !confirmPassword) {
        return {
            success: false,
            message: 'Password and confirm password are required',
        };
    }

    if (password !== confirmPassword) {
        return {
            success: false,
            message: 'Passwords do not match',
        };
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        return {
            success: false,
            message: 'Password update failed',
        };
    }

    if (error) redirect('/login');

    return {
        success: true,
        message: 'Password updated',
    };
};

export const signOutAction = async () => {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    return redirect('/login');
};
