'use client';

import { useEffect } from 'react';

import { useCrewWorkLayoutStore } from './CrewWorkLayoutStore';
import { State } from '@/store';
import { mergeOverride } from '@/store/utils';

const MergeSsrStateIntoCrewWorkLayoutStore = ({
    mergeState,
}: {
    mergeState: State;
}) => {
    const { set } = useCrewWorkLayoutStore(store => store.actions);

    useEffect(() => {
        set(state => mergeOverride(state, mergeState));
    }, [mergeState]);

    return null;
};

export default MergeSsrStateIntoCrewWorkLayoutStore;
