import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import type { Metadata } from 'next';

import QueryProvider from '@/provider/QueryProvider';
import NavBar from '@/components/custom/NavBar';

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
    title: 'Melixir - Future of how teams form & work',
    description:
        'Be one of the curated people who are building the future of how teams form and work together on internet!',
    keywords: [
        'Startup Collaboration',
        'Contributors for Ideas',
        'Build Teams for Startups',
        'Melixir Platform',
        'Melixir Community',
        'Digital Collaboration Platform',
    ],
    openGraph: {
        title: 'Melixir - Future of how teams form & work',
        description:
            'Be one of the curated people who are building the future of how teams form and work together on internet!',
        url: 'https://melixir.org',
        siteName: 'Melixir',
        images: [
            {
                url: '/preview.png',
                width: 1200,
                height: 630,
                alt: 'Melixir - Future of how teams form & work',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Melixir - Future of how teams form & work',
        description:
            'Be one of the curated people who are building the future of how teams form and work together on internet!',
        images: ['/preview.png'],
    },
    themeColor: '#5C9DFF',
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
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <QueryProvider>
                    <div className="min-h-screen flex flex-col bg-black text-white">
                        {/* <NavBar /> */}
                        {children}
                    </div>
                </QueryProvider>
                <Analytics />
            </body>
        </html>
    );
}
