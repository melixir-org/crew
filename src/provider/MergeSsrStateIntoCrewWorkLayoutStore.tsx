'use client';

import { useEffect } from 'react';

import { useCrewWorkLayoutStore } from './CrewWorkLayoutStore';
import { mergeOverride } from '@/store/utils';
import { CrewWorkLayoutState } from '@/store/crewWorkLayoutStore';

const MergeSsrStateIntoCrewWorkLayoutStore = ({
    mergeState,
}: {
    mergeState: Partial<CrewWorkLayoutState>;
}) => {
    const { set } = useCrewWorkLayoutStore(store => store.actions);

    useEffect(() => {
        set(state => mergeOverride(state, mergeState));
    }, [mergeState]);

    return null;
};

export default MergeSsrStateIntoCrewWorkLayoutStore;
