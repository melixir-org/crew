'use client';

import { useEffect } from 'react';

import { useCrewWorkLayoutStore } from './CrewWorkLayoutStore';
import { State } from '@/store';

const MergeSsrStateIntoCrewWorkLayoutStore = ({
    ssrState,
}: {
    ssrState: State;
}) => {
    const merge = useCrewWorkLayoutStore(store => store.merge);

    useEffect(() => {
        merge(ssrState);
    }, []);

    return null;
};

export default MergeSsrStateIntoCrewWorkLayoutStore;
