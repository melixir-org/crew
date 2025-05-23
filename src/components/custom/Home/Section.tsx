'use client';

import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    background?: 'darker' | 'dark' | 'gradient';
    showNavButtons?: boolean;
}

export function Section({
    children,
    className = '',
    id,
    background = 'darker',
    showNavButtons = false,
}: SectionProps) {
    const getBgColor = () => {
        switch (background) {
            case 'dark':
                return 'bg-melixir-dark';
            case 'gradient':
                return 'bg-melixir-dark';
            default:
                return 'bg-melixir-darker';
        }
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id={id}
            className={`px-4 py-16 md:py-24 w-full relative ${getBgColor()} ${className}`}
        >
            <div className="max-w-7xl mx-auto w-full">
                {children}
                {showNavButtons && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Button
                            onClick={() => scrollToSection('founders')}
                            variant="ghost"
                            className="border border-melixir-purple/30 text-melixir-purple hover:bg-melixir-purple/10 hover:text-melixir-purple transition-all"
                        >
                            For Founders{' '}
                            <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => scrollToSection('contributors')}
                            variant="ghost"
                            className="border border-melixir-blue/30 text-melixir-blue hover:bg-melixir-blue/10 hover:text-melixir-blue transition-all"
                        >
                            For Contributors{' '}
                            <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
