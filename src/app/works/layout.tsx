// TODO: get this use client removed or check if it is needed
'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';

type TabValue = 'home' | 'overview' | 'level';

interface WorksTabsProps {
    activeTab: TabValue;
    onTabChange: (tab: TabValue) => void;
}

const WorksTabs: React.FC<WorksTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <Tabs
            value={activeTab}
            onValueChange={value => onTabChange(value as TabValue)}
            className="w-full"
        >
            <TabsList className="bg-zinc-900 border border-zinc-800">
                <TabsTrigger
                    value="home"
                    className="data-[state=active]:bg-zinc-800"
                >
                    Home
                </TabsTrigger>
                <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-zinc-800"
                >
                    Overview
                </TabsTrigger>
                <TabsTrigger
                    value="level"
                    className="data-[state=active]:bg-zinc-800"
                >
                    Level
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

interface LeftContentProps {}

const LeftContent: React.FC<LeftContentProps> = () => {
    return (
        <div className="w-64 border-r border-zinc-800 p-4 bg-black">
            <p className="text-sm text-zinc-400">Left Sidebar Content</p>
        </div>
    );
};

interface RightContentProps {
    children: React.ReactNode;
}

const RightContent: React.FC<RightContentProps> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();

    const getActiveTab = (): TabValue => {
        if (pathname.includes('/works/overview')) return 'overview';
        if (pathname.includes('/works/level')) return 'level';
        return 'home';
    };

    const handleTabChange = (tab: TabValue) => {
        const routes = {
            home: '/works',
            overview: '/works/overview',
            level: '/works/level',
        };
        router.push(routes[tab]);
    };

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                    Title of the work goes here
                </h1>
            </div>
            <div className="px-6">
                <WorksTabs
                    activeTab={getActiveTab()}
                    onTabChange={handleTabChange}
                />
                <div className="mt-6">{children}</div>
            </div>
        </div>
    );
};

interface WorksLayoutProps {
    children: React.ReactNode;
}

const WorksLayout: React.FC<WorksLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <nav className="h-16 border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
                {/* Nav content will go here */}
            </nav>

            <div className="flex-1 flex">
                <LeftContent />
                <RightContent>{children}</RightContent>
            </div>
        </div>
    );
};

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <WorksLayout>{children}</WorksLayout>;
};

export default Layout;
