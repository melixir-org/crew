import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import type { Metadata } from 'next';

import QueryProvider from '@/provider/QueryProvider';

import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});

const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Melixir - Collaborate, Build, and Share Success',
    description:
        'Melixir is a platform where founders create teams for their ideas, and contributors join to turn those ideas into reality. Together, we make innovation happen.',
    keywords: [
        'Startup Collaboration',
        'Tech Founders',
        'Contributors for Ideas',
        'Build Teams for Startups',
        'Melixir Platform',
        'Innovative Projects',
        'Digital Collaboration Platform',
    ],
    openGraph: {
        title: 'Melixir - Collaborate, Build, and Share Success',
        description:
            'Melixir connects tech founders and contributors on a platform built for collaboration. Find passionate collaborators and contribute to innovative ideas.',
        url: 'https://melixir.org',
        siteName: 'Melixir',
        images: [
            {
                url: '/preview-image.png',
                width: 1200,
                height: 630,
                alt: 'Melixir - Collaborate, Build, and Share Success',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Melixir - Collaborate, Build, and Share Success',
        description:
            'Join Melixir to collaborate with founders and contributors in innovative projects. Build, grow, and succeed together.',
        images: ['/preview-image.png'],
    },
    themeColor: '#4A90E2',
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <QueryProvider>
                    <div className="min-h-screen flex flex-col bg-black text-white">
                        {children}
                    </div>
                </QueryProvider>
                <Analytics />
            </body>
        </html>
    );
}
