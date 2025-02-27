'use client';

import { logInAction } from '@/app/actions';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const LoginPage = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await logInAction(formData);

        if (!response.success) {
            setError(response.message);
        } else {
            window.location.href = '/protected';
        }
    };

    return (
        <main className="bg-primary-dark-bg w-full h-full">
            <div className="flex h-screen bg-primary-dark-bg w-full ">
                <div className="h-full w-0 flex flex-col justify-center items-center md:w-6/12 overflow-hidden">
                    <h1 className="text-9xl font-semibold">Melixir</h1>
                    <p className="text-center opacity-95 font-light">
                        Build Great Things Together
                    </p>
                </div>
                <div className="h-full w-full md:w-6/12 bg-secondary-dark-bg flex flex-col justify-center items-center">
                    <div className="flex flex-col py-6 px-4 border-2 border-auth-border bg-auth-card-bg rounded-xl text-primary-light-bg max-w-[370px] justify-between gap-3">
                        <div className="head">
                            <h1 className="text-3xl font-semibold">
                                Welcome Back!
                            </h1>
                            <p className="opacity-70">
                                Log in to continue building amazing things with
                                your crew
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col justify-between gap-2"
                        >
                            {error && <p className="text-red-500">{error}</p>}
                            <label className="flex flex-col">
                                Email
                                <input
                                    className="border-[1px] border-auth-border bg-auth-card-bg  py-1 px-1 rounded-md"
                                    placeholder="example@gmail.com" name="email"
                                />
                            </label>
                            <label className="flex flex-col">
                                Password
                                <input
                                    type="password"
                                    className="border-[1px] border-auth-border bg-auth-card-bg k py-1 px-1 rounded-md"
                                    placeholder="Password" name="password"
                                />
                            </label>
                            <button className="bg-primary-light-bg text-black py-1 rounded-md">
                                Log in with Email
                            </button>
                        </form>
                        <div className="flex w-full items-center justify-center opacity-70">
                            <hr className="w-3/12" /> <h2>OR CONTINUE WITH</h2>{' '}
                            <hr className="w-3/12" />
                        </div>
                        <div className="flex flex-col w-full justify-between gap-2">
                            <button className="py-1 border-[1px] border-auth-border rounded-md">
                                Facebook
                            </button>
                            <button className="py-1 border-[1px] border-auth-border rounded-md">
                                Github
                            </button>
                        </div>
                    </div>
                    <p className="mt-20">
                        By clicking you agree to our <a>terms of service</a> and{' '}
                        <a>privacy policy</a>.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
