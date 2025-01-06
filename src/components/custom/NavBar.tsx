import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="h-16 border-b border-zinc-800 bg-primary-dark-bg backdrop-blur supports-[backdrop-filter]:bg-black/60">
            <div className="flex w-full bg-primary-dark-bg h-full">
                <div className="w-9/12 flex justify-between mx-auto items-center">
                    <div className="flex justify-between items-center  gap-5 ">
                        <Link href={'/'}><h2 className=" font-bold text-xl">Melixir</h2></Link>
                        <Link href={'/explore'}>Explore</Link>
                        <Link href={'/workspace'}>Workspace</Link>
                    </div>
                    <div className="flex justify-between gap-5 items-center">
                        <Link href={'/login'}>
                            <button className="opacity-80 hover:opacity-100 transition-all">
                                Login
                            </button>
                        </Link>
                        <Link href={'/sign-up'}>
                            <button className=" bg-lighttxt text-slate-950 rounded-xl px-2 py-2 font-semibold">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
