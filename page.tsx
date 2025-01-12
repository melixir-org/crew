import { signUpAction } from '@/app/actions';
import Link from 'next/link';

export default function Signup() {
    return (
        <form className="flex flex-col min-w-64 max-w-64 mx-auto mt-12">  {/* Adjusted mt-12 to match the login screen */}
            <h1 className="text-2xl font-medium text-white text-center">Sign up</h1> {/* Centered only this */}
            <p className="text-sm text-white text-center">
                Already have an account?{' '}
                <Link
                    className="text-white font-medium underline"
                    href="/login"
                >
                    Sign in
                </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <label htmlFor="email" className="text-white">Email</label>
                <input
                    className="text-black"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label htmlFor="password" className="text-white">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    minLength={6}
                    required
                    className="text-black"
                />
                <button type="submit" className="mt-6 py-1.5 px-6 bg-white text-black rounded-lg font-bold">
                    Create Account
                </button>
            </div>
        </form>
    );
}
