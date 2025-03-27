'use client';

import { forgotPasswordAction } from "@/app/actions";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPassword() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await forgotPasswordAction(formData);

        if (response.success) {
            setMessage(response.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
                <div>
                <h1 className="text-2xl font-medium">Reset Password</h1>
                <p className="text-sm text-secondary-foreground">
                    Already have an account?{" "}
                    <Link className="text-primary underline" href="/login">
                    Sign in
                    </Link>
                </p>
                </div>
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <label htmlFor="email">Email</label>
                    <input className="text-black" name="email" placeholder="you@example.com" required />
                    <button type="submit">
                        Reset Password
                    </button>
                </div>
                <span className="mt-10">{message}</span>
            </form>
        </>
    );
}
