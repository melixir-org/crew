'use client';

import React from 'react';
import Panel from './Panel';

interface CrewWorkLayoutProps {
    children: React.ReactNode;
}

const CrewWorkLayout: React.FC<CrewWorkLayoutProps> = ({ children }) => {
    return (
        <div className="flex-1 flex">
            <div className="w-96 border-r border-zinc-800 p-4 bg-black">
                <Panel />
            </div>
            <div className="flex-1 flex flex-col">{children}</div>
        </div>
    );
};

export default CrewWorkLayout;
