'use client';

import { forgotPasswordAction } from "@/app/actions";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPassword() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await forgotPasswordAction(formData);

        if (response.success) {
            setMessage(response.message);
        }
    };

    return (
        <div className="flex justify-center items-start min-h-screen text-white mt-16">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-2 [&>input]:mb-6 max-w-64 mx-auto"
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <p className="text-sm mt-4">
                        Already have an account?{" "}
                        <Link
                            className="text-white font-medium underline"
                            href="/login"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <label htmlFor="email">Email</label>
                    <input
                        className="text-black"
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 py-1.5 px-6 bg-white text-black font-bold rounded-lg"
                    >
                        Reset Password
                    </button>
                </div>
                <span className="mt-10">{message}</span>
            </form>
        </div>
    );
}
