import Image from 'next/image';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { signOutAction } from './actions';
import WorkDesc from '@/components/custom/WorkDesc';

export default async function Home() {
    const {
        data: { user },
    } = await (await createSupabaseServerClient()).auth.getUser();

    return (
        <div className="items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)]">
            <nav className="mb-0">
                {user ? (
                    <form action={signOutAction}>
                        <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32">
                            Sign Out
                        </button>
                    </form>
                ) : (
                    <></>
                )}
            </nav>
            <main className="bg-primary-dark-bg w-full h-full">
                <div className="flex justify-center w-full bg-primary-dark-bg h-screen">
                    <div className="w-9/12 flex flex-col justify-evenly items-center">
                        <div className="flex flex-col justify-center items-center min-w-10 max-w-4xl">
                            <h1 className="text-5xl text-center">
                                Discover Project. Collaborate Seamlessly.
                                Achieve More Together.
                            </h1>
                            <p className="opacity-80 mt-7">
                                Join a community of passionate creators and
                                contributors to bring your ideas to life
                            </p>
                        </div>
                        <div className="button">
                            <button className="bg-primary-light-bg text-slate-950 font-semibold py-2 px-4 rounded-md">
                                Find a Crew
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
