'use client'

import { logInAction } from "@/app/actions";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login() {
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        <div className="flex flex-col items-center justify-start min-h-screen mt-12">
            {/* Login Form placed after the header */}
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full max-w-sm text-center">
                <h1 className="text-2xl font-medium text-white">Sign in</h1>
                <p className="text-sm text-white">
                    Don&apos;t have an account?{" "}
                    <Link className="text-white font-medium underline" href="/sign-up">
                        Sign up
                    </Link>
                </p>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <label htmlFor="email" className="text-white">Email</label>
                    <input className="text-black" name="email" placeholder="you@example.com" required />
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="text-white">Password</label>
                        <Link className="text-xs text-white underline" href="/forgot-password">
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
                    <button className="mt-4 py-1 px-6 bg-white text-black font-bold rounded-lg" type="submit">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}
