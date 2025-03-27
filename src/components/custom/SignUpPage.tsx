import {
    logInActionGithub,
    logInActionGoogle,
    signUpAction,
} from '@/app/actions';

const SignUpPage = () => {
    return (
        <main className="bg-primary-dark-bg w-full h-full">
            <div className="flex h-screen bg-primary-dark-bg w-full ">
                <div className="h-full w-0 flex flex-col justify-center items-center md:w-6/12 overflow-hidden">
                    <h1 className="text-9xl font-semibold ">Melixir</h1>
                    <p className="text-center opacity-95 font-light">
                        Build Great Things Together
                    </p>
                </div>
                <div className="h-full w-full bg-secondary-dark-bg flex flex-col justify-center items-center md:w-6/12">
                    <div className="flex flex-col py-6 px-4 border-2 border-auth-border bg-auth-card-bg rounded-xl text-primary-light-bg max-w-[370px] justify-between gap-4">
                        <div className="head">
                            <h1 className="text-3xl font-semibold">
                                Create an account
                            </h1>
                            <p className="opacity-70">
                                Enter you email below to create your account
                            </p>
                        </div>

                        <form className="flex flex-col justify-between gap-2">
                            <label className="flex flex-col">
                                Email
                                <input
                                    name="email"
                                    className="border-[1px] border-auth-border bg-auth-card-bg py-1 px-1 rounded-md"
                                    placeholder="example@gmail.com"
                                    required
                                />
                            </label>
                            <label className="flex flex-col">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    minLength={6}
                                    className="border-[1px] border-auth-border bg-auth-card-bg py-1 px-1 rounded-md"
                                    placeholder="Password"
                                    required
                                />
                            </label>
                            <button
                                className="bg-primary-light-bg text-black py-1 rounded-md"
                                formAction={signUpAction}
                            >
                                Create Account
                            </button>
                            <div className="flex w-full items-center justify-center opacity-70">
                                <hr className="w-3/12" />{' '}
                                <h2>OR CONTINUE WITH</h2>{' '}
                                <hr className="w-3/12" />
                            </div>
                            <div className="flex w-full justify-between">
                                <button
                                    className="py-1 border-[1px] border-auth-border rounded-md w-5/12"
                                    onClick={logInActionGoogle}
                                >
                                    Google
                                </button>
                                <button
                                    className="py-1 border-[1px] border-auth-border rounded-md w-5/12"
                                    onClick={logInActionGithub}
                                >
                                    Github
                                </button>
                            </div>
                        </form>
                    </div>
                    <p className="mt-20 w-8/12">
                        By clicking you agree to our <a>terms of service</a> and{' '}
                        <a>privacy policy</a>.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SignUpPage;
