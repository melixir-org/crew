'use client';

import { useEffect, useRef } from 'react';
import { Navbar } from '@/components/custom/Home/Navbar';
import { FloatingCTA } from '@/components/custom/Home/FloatingCTA';
import { Section } from '@/components/custom/Home/Section';
import { FeatureColumns } from '@/components/custom/Home/FeatureColumns';
import { StepCard } from '@/components/custom/Home/StepCard';
import { SignupForm } from '@/components/custom/Home/SignupForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, ChevronDown, ChevronRight, X } from 'lucide-react';

import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-grotesk',
});

export default function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll(
            '.melixir-animate-on-scroll'
        );
        elements.forEach(el => {
            observer.observe(el);
        });

        return () => {
            elements.forEach(el => {
                observer.unobserve(el);
            });
        };
    }, []);

    const betaFeatures = [
        'Limited to 100 curated founders',
        '500 curated contributors',
        'Get access to Melixir platform',
        'Full support from community',
        'Lifetime legacy perks',
    ];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            className={`${spaceGrotesk.variable} in-h-screen bg-melixir-darker overflow-x-hidden melixir-app`}
        >
            <Navbar />
            <FloatingCTA />

            {/* Hero Section */}
            <Section>
                <div className="absolute inset-0 bg-melixir-darker opacity-80"></div>
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-melixir-darker to-transparent z-10"></div>

                <div className="grid md:grid-cols-2 gap-12 items-center z-20 px-4 max-w-7xl w-full pt-16 md:pt-0">
                    <div className="text-center md:text-left melixir-animate-on-scroll opacity-0">
                        <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-grotesk font-bold mb-6 melixir-text-glow">
                            <span className="block">You&apos;re</span>
                            <span className="melixir-text-gradient animate-gradient-shift bg-[length:200%]">
                                On Time
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-melixir-light/80 max-w-2xl mx-auto md:mx-0">
                            Melixir is the future of how{' '}
                            <span className="text-melixir-purple font-semibold">
                                Teams
                            </span>{' '}
                            form & work. Be one of the{' '}
                            <span className="text-melixir-purple font-semibold">
                                curated people
                            </span>{' '}
                            to build & enjoy this future!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button
                                className="bg-gradient hover:opacity-90"
                                onClick={() => scrollToSection('what')}
                            >
                                Learn More{' '}
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <Card className="bg-gradient p-0.5 rounded-lg melixir-animate-on-scroll opacity-0 md:ml-auto z-30">
                        <div className="bg-melixir-darker rounded-[calc(0.5rem-1px)] p-8">
                            <h2 className="text-2xl font-grotesk font-bold mb-6 text-melixir-light">
                                Join WhatsApp Group
                            </h2>
                            <div className="space-y-4">
                                {betaFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="bg-melixir-purple/20 p-1 rounded-full">
                                            <Check className="h-4 w-4 text-melixir-purple" />
                                        </div>
                                        <p className="text-melixir-light/80">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                                <Button
                                    className="bg-gradient hover:opacity-90 w-full mt-4"
                                    onClick={() =>
                                        scrollToSection('beta-signup-form')
                                    }
                                >
                                    Apply Now{' '}
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </Section>

            {/* What is Melixer Section */}
            <Section id="what" background="dark" showNavButtons={true}>
                <div className="max-w-3xl mx-auto">
                    <div className="melixir-animate-on-scroll opacity-0 text-center">
                        <h2 className="text-3xl md:text-4xl font-grotesk font-bold mb-4 melixir-text-gradient">
                            What is Melixir?
                        </h2>
                        <p className="text-melixir-light/80 mb-6">
                            We started by ditching all the approaches of
                            building teams known to humans.
                        </p>
                        <p className="text-melixir-light/80 mb-6">
                            Melixir is a completely new way of bridging the gap
                            between{' '}
                            <span className="text-melixir-blue font-semibold">
                                Ideas
                            </span>{' '}
                            and{' '}
                            <span className="text-melixir-blue font-semibold">
                                Skills
                            </span>
                            . It is a unique collaboration platform for founders
                            & contributors to work together by adding value from{' '}
                            <span className="text-melixir-blue font-semibold">
                                Day 1
                            </span>
                            .
                        </p>
                    </div>

                    {/* <div className="melixir-card-glass rounded-lg p-8 melixir-animate-on-scroll opacity-0">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-gradient p-3 rounded-lg">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <Lightbulb className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-grotesk font-semibold mb-2">
                                        Ideas Need Execution
                                    </h3>
                                    <p className="text-melixir-light/70 text-sm">
                                        Founders with brilliant ideas often lack
                                        the technical skills to bring them to
                                        life.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-gradient p-3 rounded-lg">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <Wrench className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-grotesk font-semibold mb-2">
                                        Skills Need Direction
                                    </h3>
                                    <p className="text-melixir-light/70 text-sm">
                                        Talented individuals with technical
                                        skills seek meaningful projects to work
                                        on.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-gradient p-3 rounded-lg">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <Link2 className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-grotesk font-semibold mb-2">
                                        Melixir Connects Both
                                    </h3>
                                    <p className="text-melixir-light/70 text-sm">
                                        Our platform creates the perfect
                                        environment for collaboration, leading
                                        to stronger startups.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </Section>

            {/* For Founders Section */}
            <Section id="founders">
                <FeatureColumns
                    title="Build Without Funding"
                    features={[
                        {
                            title: 'Build Without Quitting Job',
                            description:
                                'Melixir is async, flexible, and progress-first.',
                        },
                        {
                            title: 'Iterate in Public',
                            description:
                                'Get feedback, attention, and community support while building.',
                        },
                        {
                            title: 'No Hiring',
                            description:
                                'Build your startup with who add value today not in the future.',
                        },
                        {
                            title: 'Law of Attraction',
                            description:
                                'Who are meant to join you, are waiting for you to be open & visible.',
                        },
                    ]}
                />
            </Section>

            {/* For Contributors Section */}
            <Section id="contributors" background="dark">
                <FeatureColumns
                    title="Get Into Unicorns Early"
                    features={[
                        {
                            title: 'Try New Startups Daily',
                            description:
                                'Discover your passion through diverse startup experiences.',
                        },
                        {
                            title: 'Equity or Revenue Share',
                            description:
                                'Who knows your early contributions might make you a millionaire?',
                        },
                        {
                            title: 'No Interviews',
                            description:
                                'Interviews are obsolete. Contribute directly to earn your seat at the table.',
                        },
                        {
                            title: 'Average Up',
                            description:
                                "Grow your network because you're the average of your 5 closest people.",
                        },
                    ]}
                />
            </Section>

            {/* How It Works Section */}
            <Section>
                <div className="text-center mb-12 melixir-animate-on-scroll opacity-0">
                    <h2 className="text-3xl md:text-4xl font-grotesk font-bold mb-4 melixir-text-gradient">
                        How Melixir Works?
                    </h2>
                    <p className="text-lg md:text-xl text-melixir-light/90 max-w-3xl mx-auto leading-relaxed">
                        Melixir facilitates a{' '}
                        <span className="text-melixir-blue font-semibold">
                            structured collaboration
                        </span>{' '}
                        flow to its every minute detail.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StepCard
                        number={1}
                        title="Founders: Post Ideas & Tasks"
                        description="Share your startup vision and break it down into real, actionable tasks. Others can pick them up and start contributing instantly."
                    />
                    <StepCard
                        number={2}
                        title="Contributors: Start Building"
                        description="Designers, developers, and marketers choose tasks that match their skills and interests to add value from Day 1."
                    />
                    <StepCard
                        number={3}
                        title="Teams Form Organically"
                        description="No hiring. Just real & structured collaboration that grows into long-term partnerships."
                    />
                    <StepCard
                        number={4}
                        title="Startups Launch, Together"
                        description="Turn ideas into products, get paid, gain equity, grow your network, and build your portfolio from Day 1."
                    />
                </div>
            </Section>

            {/* Join Beta Section */}
            <Section background="dark">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <Card className="bg-gradient p-0.5 rounded-lg melixir-animate-on-scroll opacity-0">
                        <div className="bg-melixir-darker rounded-[calc(0.5rem-1px)] p-8">
                            <h2 className="text-2xl font-grotesk font-bold mb-6 text-melixir-light">
                                Join WhatsApp Group
                            </h2>
                            <div className="space-y-4">
                                {betaFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="bg-melixir-purple/20 p-1 rounded-full">
                                            <Check className="h-4 w-4 text-melixir-purple" />
                                        </div>
                                        <p className="text-melixir-light/80">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <div className="melixir-animate-on-scroll opacity-0">
                        <h2 className="text-3xl md:text-4xl font-grotesk font-bold mb-4 melixir-text-gradient">
                            Be One Of Us!
                        </h2>
                        <p className="text-melixir-light/80 mb-6">
                            We&apos;re a curated group of founders and
                            contributors to ensure quality connections, smooth
                            experience and serve closely.
                        </p>
                        <p className="text-melixir-light/80 mb-8">
                            Apply now to get access to Melixir platform & all
                            other benefits. Shape how the next generation of
                            startups are built with us!.
                        </p>
                        <Button
                            className="bg-gradient hover:opacity-90"
                            onClick={() => scrollToSection('beta-signup-form')}
                        >
                            Apply Now <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Section>

            {/* Not For Everyone Section */}
            <Section>
                <div className="text-center mb-12 melixir-animate-on-scroll opacity-0">
                    <h2 className="text-3xl md:text-4xl font-grotesk font-bold mb-4 melixir-text-gradient">
                        Not For Everyone
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="bg-melixir-gray/50 border-white/5 p-6 melixir-animate-on-scroll opacity-0">
                        <h3 className="flex items-center gap-2 font-grotesk text-xl mb-4">
                            <X className="h-5 w-5 text-red-500" />
                            <span className="text-melixir-light">
                                Not for those who...
                            </span>
                        </h3>
                        <ul className="space-y-3 text-melixir-light/80">
                            <li className="flex items-start gap-2">
                                <div className="bg-red-500/10 p-1 rounded-full mt-1">
                                    <X className="h-3 w-3 text-red-500" />
                                </div>
                                <p>Want overnight success or quick fixes</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="bg-red-500/10 p-1 rounded-full mt-1">
                                    <X className="h-3 w-3 text-red-500" />
                                </div>
                                <p>
                                    Aren&apos;t willing to contribute real value
                                </p>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="bg-red-500/10 p-1 rounded-full mt-1">
                                    <X className="h-3 w-3 text-red-500" />
                                </div>
                                <p>
                                    View equity as &apos;free&apos; compensation
                                </p>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="bg-red-500/10 p-1 rounded-full mt-1">
                                    <X className="h-3 w-3 text-red-500" />
                                </div>
                                <p>
                                    Aren&apos;t committed to long-term value
                                    creation
                                </p>
                            </li>
                        </ul>
                    </Card>

                    <Card className="bg-melixir-gray/50 border-white/5 p-6 melixir-animate-on-scroll opacity-0">
                        <h3 className="flex items-center gap-2 font-grotesk text-xl mb-4">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-melixir-light">
                                Perfect for those who...
                            </span>
                        </h3>
                        <ul className="space-y-3 text-melixir-light/80">
                            <li className="flex items-start gap-2">
                                <div className="bg-green-500/10 p-1 rounded-full mt-1">
                                    <Check className="h-3 w-3 text-green-500" />
                                </div>
                                <p>
                                    Value relationships built on demonstrated
                                    value
                                </p>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="bg-green-500/10 p-1 rounded-full mt-1">
                                    <Check className="h-3 w-3 text-green-500" />
                                </div>
                                <p>
                                    Want to build genuine partnerships through
                                    work
                                </p>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="bg-green-500/10 p-1 rounded-full mt-1">
                                    <Check className="h-3 w-3 text-green-500" />
                                </div>
                                <p>
                                    Understand that trust takes time to develop
                                </p>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="bg-green-500/10 p-1 rounded-full mt-1">
                                    <Check className="h-3 w-3 text-green-500" />
                                </div>
                                <p>
                                    Are committed to building something
                                    meaningful
                                </p>
                            </li>
                        </ul>
                    </Card>
                </div>
            </Section>

            {/* Signup Section */}
            <Section id="beta-signup-form" background="gradient">
                <div className="text-center max-w-3xl mx-auto melixir-animate-on-scroll opacity-0">
                    <h2 className="text-3xl md:text-5xl font-grotesk font-bold mb-6 melixir-text-gradient">
                        Be One Of Us!
                    </h2>
                    <p className="text-melixir-light/80 mb-8 max-w-2xl mx-auto">
                        Apply now to get access to Melixir platform & all other
                        benefits.
                    </p>
                    <div className="pt-8">
                        <SignupForm />
                    </div>
                </div>
            </Section>

            {/* Footer */}
            <footer className="bg-melixir-darker py-8 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <button
                        className="melixir-text-gradient font-grotesk text-xl font-bold mb-2 hover:opacity-80 transition-opacity"
                        onClick={scrollToTop}
                    >
                        Melixir
                    </button>
                    <p className="text-melixir-light/60 text-sm">
                        © 2025 Melixir. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
