"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const supabase = createClient();
    const origin = headers().get("origin");

    if (!email || !password) {
        return {
            success: false,
            message: "Email and password are required",
        };
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        return redirect('/error');
    }

    revalidatePath('/','layout');
    redirect('/login');
};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        redirect('/error')
    }
    
    return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const supabase = createClient();
    const origin = headers().get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();

    if (!email) {
        return {
            success: false,
            message: "Email is required!",
        };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
    });

    if (error) {
        console.error(error.message);
        return {
            success: false,
            message: "Could not reset password",
        };
    }


    if (callbackUrl) {
        return redirect(callbackUrl);
    }

    return {
        success: true,
        message: "Check your email for a link to reset your password.",
    };
};

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        return {
            success: false,
            message: "Password and confirm password are required",
        };
    }

    if (password !== confirmPassword) {
        return {
            success: false,
            message: "Passwords do not match",
        };
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        return {
            success: false,
            message: "Password update failed",
        };
    }

    if(error) redirect('/login');

    return {
        success: true,
        message: "Password updated",
    };

};

export const signOutAction = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
};