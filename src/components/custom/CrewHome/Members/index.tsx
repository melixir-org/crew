'use client';

import { usePathname } from 'next/navigation';
import { extractWorkId } from '@/lib/utils';
import { NEW } from '@/lib/constants';
import React from 'react';
import MembersList from './MembersList';

const Members = () => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const crewCreateMode = workId === NEW;

    return crewCreateMode ? (
        <div>work in progress, please ignore & continue</div>
    ) : (
        <MembersList />
    );
};

export default Members;
