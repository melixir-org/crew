import { logInSignUpWithGithub, logInSignUpWithGoogle } from '@/app/actions';

export default function Login() {
    return (
        <main className="bg-primary-dark-bg w-full flex-1 flex">
            <div className="flex bg-primary-dark-bg w-full flex-1">
                <div className="h-full w-0 flex flex-col justify-center items-center md:w-6/12 overflow-hidden">
                    <h1 className="text-9xl font-semibold">Melixir</h1>
                    <p className="text-center opacity-95 font-light">
                        Build Great Things Together
                    </p>
                </div>
                <div className="h-full w-full md:w-6/12 bg-secondary-dark-bg flex flex-col justify-center items-center">
                    <div className="flex flex-col py-6 px-4 border-2 border-auth-border bg-auth-card-bg rounded-xl text-primary-light-bg max-w-[370px] justify-between gap-3">
                        <div className="head">
                            <h1 className="text-3xl font-semibold">Welcome!</h1>
                            <p className="opacity-70">
                                Proceed to build your crew or join an existing
                                crew
                            </p>
                        </div>
                        <div className="flex w-full items-center justify-center opacity-70">
                            <hr className="w-3/12" /> <h2>CONTINUE WITH</h2>{' '}
                            <hr className="w-3/12" />
                        </div>
                        <div className="flex flex-col w-full justify-between gap-2">
                            <button
                                className="py-1 border-[1px] border-auth-border rounded-md"
                                onClick={logInSignUpWithGoogle}
                            >
                                Google
                            </button>
                            <button
                                className="py-1 border-[1px] border-auth-border rounded-md"
                                onClick={logInSignUpWithGithub}
                            >
                                Github
                            </button>
                        </div>
                    </div>
                    <p className="mt-20">
                        By continuing you agree to our <a>terms of service</a>{' '}
                        and <a>privacy policy</a>.
                    </p>
                </div>
            </div>
        </main>
    );
}
