const SignUp = () => {
    return (
        <main className="bg-primarydarkbg w-full h-full">
            <div className="flex h-screen bg-primarydarkbg w-full ">
                <div className="h-full w-0 flex flex-col justify-center items-center md:w-6/12 overflow-hidden">
                    <h1 className="text-9xl font-semibold ">Melixir</h1>
                    <p className="text-center opacity-95 font-light">
                        Build Great Things Together
                    </p>
                </div>
                <div className="h-full w-full bg-secondarydarkbg flex flex-col justify-center items-center md:w-6/12">
                    <div className="flex flex-col py-6 px-4 border-2 border-authborder bg-authcardbg rounded-xl text-primarylightbg max-w-[370px] justify-between gap-3">
                        <div className="head">
                            <h1 className="text-3xl font-semibold">
                                Create an account
                            </h1>
                            <p className="opacity-70">
                                Enter you email below to create your account
                            </p>
                        </div>
                        <div className="flex w-full justify-between">
                            <button className="py-1 border-[1px] border-authborder rounded-md w-5/12">
                                Google
                            </button>
                            <button className="py-1 border-[1px] border-authborder rounded-md w-5/12">
                                Facebook
                            </button>
                        </div>
                        <div className="flex w-full items-center justify-center opacity-70">
                            <hr className="w-3/12" /> <h2>OR CONTINUE WITH</h2>{' '}
                            <hr className="w-3/12" />
                        </div>

                        <form className="flex flex-col justify-between gap-2">
                            <label className="flex flex-col">
                                Name
                                <input
                                    className="border-[1px] border-authborder bg-authcardbg py-1 px-1 rounded-md"
                                    placeholder="Password"
                                />
                            </label>
                            <label className="flex flex-col">
                                Email
                                <input
                                    className="border-[1px] border-authborder bg-authcardbg py-1 px-1 rounded-md"
                                    placeholder="example@gmail.com"
                                />
                            </label>
                            <label className="flex flex-col">
                                Password
                                <input
                                    type="password"
                                    className="border-[1px] border-authborder bg-authcardbg py-1 px-1 rounded-md"
                                    placeholder="Password"
                                />
                            </label>
                        </form>
                        <button className="bg-primarylightbg text-black py-1 rounded-md">
                            Create Account
                        </button>
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

export default SignUp;
