const HomePageBody = () => {
    return (
        <main className="bg-slate-950 w-full h-full">
            <div className="flex justify-center w-full bg-slate-950 h-screen">
                <div className="w-9/12 flex flex-col justify-evenly items-center">
                    <div className="flex flex-col justify-center items-center min-w-10 max-w-4xl">
                        <h1 className="text-5xl text-center">
                            Discover Project. Collaborate Seamlessly. Achieve
                            More Together.
                        </h1>
                        <p className="opacity-80 mt-7">
                            Join a community of passionate creators and
                            contributors to bring your ideas to life
                        </p>
                    </div>
                    <div className="button">
                        <button className="bg-slate-50 text-slate-950 font-semibold py-2 px-4 rounded-md ">
                            {' '}
                            Find a Crew
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HomePageBody;
