'use client';

import { useEffect, useRef } from 'react';
import {
    Briefcase,
    Globe,
    UserMinus,
    Magnet,
    Shuffle,
    PieChart,
    FileCheck,
    TrendingUp,
} from 'lucide-react';

interface FeatureColumnsProps {
    title: string;
    features: {
        title: string;
        description: string;
    }[];
}

export function FeatureColumns({ title, features }: FeatureColumnsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

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

        const section = sectionRef.current;
        if (section) {
            observer.observe(section);
        }

        const featureElements = document.querySelectorAll('.feature-item');
        featureElements.forEach((el, index) => {
            el.classList.add('opacity-0');
            el.setAttribute('style', `animation-delay: ${index * 100}ms`);
            observer.observe(el);
        });

        return () => {
            if (section) {
                observer.unobserve(section);
            }
            featureElements.forEach(el => {
                observer.unobserve(el);
            });
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className="melixir-animate-on-scroll opacity-0 relative py-8 md:py-16"
        >
            {/* Background decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-melixir-purple/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-melixir-blue/5 rounded-full blur-3xl"></div>

            {/* Header section with improved styling */}
            <div className="mb-16 text-center max-w-3xl mx-auto relative">
                <span className="inline-block px-4 py-1 rounded-full bg-melixir-purple/10 text-melixir-purple text-sm font-medium mb-4">
                    {title.includes('Funding')
                        ? 'For Founders'
                        : 'For Contributors'}
                </span>
                <h2 className="text-3xl md:text-5xl font-grotesk font-bold mb-6 melixir-text-gradient">
                    {title}
                </h2>
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-melixir-purple/20 to-melixir-blue/20 rounded-full blur-3xl"></div>
            </div>

            {/* Features grid with improved card design */}
            <div className="grid gap-6 md:grid-cols-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="feature-item animate-fade-in opacity-0 bg-melixir-darker/50 backdrop-blur-sm border border-white/5 hover:border-melixir-purple/30 p-6 rounded-xl transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-melixir-purple/10"
                    >
                        <div className="w-12 h-12 rounded-lg bg-gradient flex items-center justify-center mb-4 text-white">
                            {title.includes('Funding') ||
                            title.includes('Startup') ? (
                                // Icons for Founders section - more contextually appropriate
                                index === 0 ? (
                                    <Briefcase className="h-6 w-6" /> // Build without quitting job - briefcase represents job
                                ) : index === 1 ? (
                                    <Globe className="h-6 w-6" /> // Iterate in public - globe represents public visibility
                                ) : index === 2 ? (
                                    <UserMinus className="h-6 w-6" /> // No hiring - user with minus sign
                                ) : (
                                    <Magnet className="h-6 w-6" /> // Law of attraction - magnet represents attraction
                                )
                            ) : // Icons for Contributors section - more contextually appropriate
                            index === 0 ? (
                                <Shuffle className="h-6 w-6" /> // Try different startups - shuffle represents trying different things
                            ) : index === 1 ? (
                                <PieChart className="h-6 w-6" /> // Equity/revenue share - pie chart represents shares
                            ) : index === 2 ? (
                                <FileCheck className="h-6 w-6" /> // No interviews - document with check mark represents direct contribution
                            ) : (
                                <TrendingUp className="h-6 w-6" /> // Average up - trending up represents growth and improvement
                            )}
                        </div>
                        <h3 className="text-xl font-grotesk font-semibold mb-3">
                            {feature.title}
                        </h3>
                        <p className="text-melixir-light/70">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
