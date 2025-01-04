const Login = () => {
    return (
        <main className="bg-primarydarkbg w-full h-full">
            <div className="flex h-screen bg-primarydarkbg w-full ">
                <div className="h-full w-0 flex flex-col justify-center items-center md:w-6/12 overflow-hidden">
                    <h1 className="text-9xl font-semibold">Melixir</h1>
                    <p className="text-center opacity-95 font-light">
                        Build Great Things Together
                    </p>
                </div>
                <div className="h-full w-full md:w-6/12 bg-secondarydarkbg flex flex-col justify-center items-center">
                    <div className="flex flex-col py-6 px-4 border-2 border-authborder bg-authcardbg rounded-xl text-lighttxt max-w-[370px] justify-between gap-3">
                        <div className="head">
                            <h1 className="text-3xl font-semibold">
                                Welcome Back!
                            </h1>
                            <p className="opacity-70">
                                Log in to continue building amazing things with
                                your crew
                            </p>
                        </div>
                        <form className="flex flex-col justify-between gap-2">
                            <label className="flex flex-col">
                                Email
                                <input
                                    className="border-[1px] border-authborder bg-authcardbg  py-1 px-1 rounded-md"
                                    placeholder="example@gmail.com"
                                />
                            </label>
                            <label className="flex flex-col">
                                Password
                                <input
                                    type="password"
                                    className="border-[1px] border-authborder bg-authcardbg k py-1 px-1 rounded-md"
                                    placeholder="Password"
                                />
                            </label>
                        </form>
                        <button className="bg-light text-black py-1 rounded-md">
                            Log in with Email
                        </button>
                        <div className="flex w-full items-center justify-center opacity-70">
                            <hr className="w-3/12" /> <h2>OR CONTINUE WITH</h2>{' '}
                            <hr className="w-3/12" />
                        </div>
                        <div className="flex flex-col w-full justify-between gap-2">
                            <button className="py-1 border-[1px] border-authborder rounded-md">
                                Facebook
                            </button>
                            <button className="py-1 border-[1px] border-authborder rounded-md">
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

export default Login;
