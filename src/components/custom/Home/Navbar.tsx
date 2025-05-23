'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-melixir-darker/90 backdrop-blur-sm py-3'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-xl font-bold font-grotesk melixir-text-gradient">
                        Melixir
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <button
                        className="text-sm text-melixir-light/80 hover:text-melixir-purple transition-colors"
                        onClick={() => scrollToSection('what')}
                    >
                        What is Melixir?
                    </button>
                    <button
                        className="text-sm text-melixir-light/80 hover:text-melixir-purple transition-colors"
                        onClick={() => scrollToSection('founders')}
                    >
                        For Founders
                    </button>
                    <button
                        className="text-sm text-melixir-light/80 hover:text-melixir-purple transition-colors"
                        onClick={() => scrollToSection('contributors')}
                    >
                        For Contributors
                    </button>
                    <Button
                        className="border-melixir-purple text-melixir-purple hover:bg-melixir-purple/10"
                        onClick={() => scrollToSection('beta-signup-form')}
                    >
                        Apply Now
                    </Button>
                </nav>

                <div className="flex gap-2 md:hidden">
                    <Button
                        variant="ghost"
                        className="text-xs px-3 py-1 h-auto text-melixir-purple hover:bg-melixir-purple/10 hover:text-melixir-purple border border-melixir-purple/50"
                        onClick={() => scrollToSection('founders')}
                    >
                        For Founders
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-xs px-3 py-1 h-auto text-melixir-purple hover:bg-melixir-purple/10 hover:text-melixir-purple border border-melixir-purple/50"
                        onClick={() => scrollToSection('contributors')}
                    >
                        For Contributors
                    </Button>
                </div>
            </div>
        </header>
    );
}
