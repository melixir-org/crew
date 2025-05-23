'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function FloatingCTA() {
    const scrollToSignup = () => {
        const element = document.getElementById('beta-signup-form');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <Button
                className="bg-gradient hover:opacity-90 transition-all shadow-lg rounded-full melixir-glow-border text-white px-6 py-6 font-semibold"
                onClick={scrollToSignup}
            >
                Apply Now <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
        </div>
    );
}
