import Link from 'next/link';
import { WORKSPACE_ROUTE } from './routes';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#101010] via-[#121212] to-black text-white font-sans">
            {/* Navbar */}

            {/* Hero Section */}
            <header className="flex flex-col items-center justify-center text-center py-28 px-6">
                <h1 className="text-5xl md:text-7xl font-extrabold max-w-3xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                    Collaborate, Build, and Share Success
                </h1>
                <p className="text-lg text-gray-400 mt-6 max-w-2xl">
                    A platform where tech founders bring projects, break them
                    into smaller tasks, and collaborate with contributors to
                    bring ideas to life.
                </p>
                <Link
                    href={WORKSPACE_ROUTE.pathname}
                    className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg rounded-full hover:scale-105 shadow-lg transform transition-transform"
                >
                    Explore Crews
                </Link>
            </header>

            {/* Problem Section */}
            <section className="py-20 px-6 bg-[#121212]">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        The Challenge
                    </h2>
                    <p className="text-lg text-gray-400">
                        Building something meaningful needs the right people who
                        share your vision and passion for collaboration.
                    </p>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-20 px-6 bg-[#101010] border-t border-gray-700">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                        Our Solution
                    </h2>
                    <p className="text-lg text-gray-400">
                        Whether you’re building your MVP or providing your
                        expertise, Melixir creates a collaborative space by
                        ensuring transparency, easier management, and rewarding
                        contributions equitably for shared success.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {[
                            {
                                title: 'For Founders',
                                description:
                                    'Break your project into simple tasks to help others get started and keep things organized.',
                            },
                            {
                                title: 'For Contributors',
                                description:
                                    'Work on exciting projects, team up with great founders, and build your skills.',
                            },
                            {
                                title: 'Shared Success',
                                description:
                                    'Get rewarded for your efforts with equity, profits, or a full time job.',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-[#121212] rounded-lg border border-gray-700 hover:scale-105 transform transition"
                            >
                                <h3 className="text-xl font-semibold mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-6 bg-[#121212]">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {[
                            {
                                step: '1. Find What Inspires You',
                                description:
                                    'Discover exciting projects by fellow founders or start your own project.',
                            },
                            {
                                step: '2. Build in Public',
                                description:
                                    "Catch world's attention as you build to get early feedback. #buildinpublic",
                            },
                            {
                                step: '3. Build with the Right People',
                                description:
                                    'Keep doing your part, and the right teammates will naturally join along the way.',
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="p-6 bg-[#101010] rounded-lg border border-gray-700 hover:scale-105 transform transition"
                            >
                                <h3 className="text-xl font-semibold mb-4">
                                    {step.step}
                                </h3>
                                <p className="text-gray-400">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-black to-[#101010]">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                        Join a Crew Today
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
                        Don’t miss out on the chance to build something great.
                    </p>
                    <Link
                        href={WORKSPACE_ROUTE.pathname}
                        className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg rounded-full hover:scale-105 shadow-lg transform transition-transform"
                    >
                        Explore Crews
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 bg-[#101010] border-t border-gray-700">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400">
                        © 2025 Melixir. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {[
                            'Privacy Policy',
                            'Terms of Service',
                            'Contact Us',
                        ].map((link, index) => (
                            <a
                                key={index}
                                href="#"
                                className="text-gray-400 hover:text-white transition"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}

// uncomment this when our product is ready to be deployed

/* export default function Home() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#101010] via-[#121212] to-black text-white font-sans">
        // Navbar 
        <nav className="flex justify-between items-center px-8 py-5 bg-[#101010] sticky top-0 z-50 shadow-md">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Melixir
          </div>
          <div className="flex gap-4">
            <a
              href="/login"
              className="px-6 py-2 border border-gray-700 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg hover:opacity-90 transition"
            >
              Sign Up
            </a>
          </div>
        </nav>
  
        // Hero Section
        <header className="flex flex-col items-center justify-center text-center py-28 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent leading-tight">
            Collaborate, Build, and Grow Together
          </h1>
          <p className="text-lg text-gray-400 mt-6 max-w-2xl">
            Founders create crews for their products, and contributors join to bring ideas to life. Together, we build the future.
          </p>
          <div className="flex gap-4 mt-8">
            <a
              href="/create-crew"
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold rounded-full hover:scale-105 shadow-lg transform transition-transform"
            >
              Create a Crew
            </a>
            <a
              href="/explore-crews"
              className="px-8 py-4 border border-gray-700 font-semibold rounded-full hover:bg-gray-800 transition"
            >
              Explore Crews
            </a>
          </div>
        </header>
  
        // Problem Section
        <section className="py-20 px-6 bg-[#121212]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              The Challenge
            </h2>
            <p className="text-lg text-gray-400">
              Are you a tech founder struggling to build your product? Or are you a skilled contributor looking for exciting projects to join? Finding the right team online can be risky, but collaboration makes the journey worthwhile.
            </p>
          </div>
        </section>
  
        // Solution Section
        <section className="py-20 px-6 bg-[#101010] border-t border-gray-700">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
              Our Solution
            </h2>
            <p className="text-lg text-gray-400">
              Melixir brings tech founders and contributors together to create incredible products. Whether you&apos;re building your MVP or contributing your skills, our platform ensures seamless collaboration and shared success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "For Founders",
                  description:
                    "Create crews for your product ideas and find contributors who believe in your vision.",
                },
                {
                  title: "For Contributors",
                  description:
                    "Join exciting projects, collaborate with passionate founders, and grow your expertise.",
                },
                {
                  title: "Build Together",
                  description:
                    "Work seamlessly to turn ideas into reality while sharing ownership through equity.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#121212] rounded-lg border border-gray-700 hover:scale-105 transform transition"
                >
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        // How It Works Section
        <section className="py-20 px-6 bg-[#121212]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  step: "1. Create a Crew",
                  description:
                    "Founders post their product idea and specify roles for contributors.",
                },
                {
                  step: "2. Join a Crew",
                  description:
                    "Contributors explore and join crews that align with their interests and skills.",
                },
                {
                  step: "3. Collaborate and Build",
                  description:
                    "Work as a team to complete tasks, bring ideas to life, and share success.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#101010] rounded-lg border border-gray-700 hover:scale-105 transform transition"
                >
                  <h3 className="text-xl font-semibold mb-4">{step.step}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        // Call to Action Section
        <section className="py-20 px-6 bg-gradient-to-b from-black to-[#101010]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Whether you&apos;re a founder building your MVP or a contributor looking to grow your skills, Melixir is the perfect platform for collaboration. Join us today.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <a
                href="/create-crew"
                className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold rounded-full hover:scale-105 shadow-lg transform transition-transform"
              >
                Create a Crew
              </a>
              <a
                href="/explore-crews"
                className="px-8 py-4 border border-gray-700 font-semibold rounded-full hover:bg-gray-800 transition"
              >
                Explore Crews
              </a>
            </div>
          </div>
        </section>
  
        // Footer
        <footer className="py-8 px-6 bg-black border-t border-gray-700">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">© 2025 Melixir. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-500 hover:text-white transition"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </footer>
      </div>
    );
} */
