'use client'

import { logInAction } from "@/app/actions";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login() {
    const [error, setError] = useState("");

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await logInAction(formData);

        if (!response.success) {
            setError(response.message);
        } else {
            window.location.href = "/protected"; 
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-w-64 w-96 text-center justify-center">
                <h1 className="text-2xl font-medium">Sign in</h1>
                <p className="text-sm text-foreground">
                    Don&apos;t have an account?{" "}
                    <Link className="text-foreground font-medium underline" href="/sign-up">
                        Sign up
                    </Link>
                </p>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <label htmlFor="email">Email</label>
                    <input className="text-black" name="email" placeholder="you@example.com" required />
                    <div className="flex justify-between items-center">
                        <label htmlFor="password">Password</label>
                        <Link className="text-xs text-foreground underline" href="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>
                    <input
                        className="text-black" 
                        type="password"
                        name="password"
                        placeholder="Your password"
                        required
                    />
                    <button type="submit">
                        Sign in
                    </button>
                </div>
            </form>
        </>
    );
}
