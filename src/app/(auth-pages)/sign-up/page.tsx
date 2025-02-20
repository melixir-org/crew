import { signUpAction } from '@/app/actions';
import Link from 'next/link';

export default function Signup() {
    return (
        <form className="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">Sign up</h1>
            <p className="text-sm text text-foreground">
                Already have an account?{' '}
                <Link
                    className="text-primary font-medium underline"
                    href="/login"
                >
                    Sign in
                </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <label htmlFor="email">Email</label>
                <input
                    className="text-black"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    minLength={6}
                    required
                    className="text-black"
                />
                <button formAction={signUpAction}>Sign up</button>
            </div>
        </form>
    );
}
