'use client';

import { useEffect } from 'react';

import { useCrewWorkLayoutStore } from './CrewWorkLayoutStore';
import { mergeOverride } from '@/store/utils';
import { CrewWorkLayoutState } from '@/store/crewWorkLayoutStore';

// SSR state is always up-to-date with the server
// Merging SSR state into CrewWorkLayoutStore keeps the store in sync with the server
const MergeSsrStateIntoCrewWorkLayoutStore = ({
    mergeState,
}: {
    mergeState: Partial<CrewWorkLayoutState>;
}) => {
    const { setServer } = useCrewWorkLayoutStore(store => store);

    useEffect(() => {
        setServer(server => mergeOverride(server, mergeState));
    }, [mergeState]);

    return null;
};

export default MergeSsrStateIntoCrewWorkLayoutStore;
