'use client';

import { useEffect } from 'react';
import { isArray, mergeWith } from 'lodash-es';

import { useCrewWorkLayoutStore } from './CrewWorkLayoutStore';
import { State } from '@/store';

const MergeSsrStateIntoCrewWorkLayoutStore = ({
    ssrState,
}: {
    ssrState: State;
}) => {
    const set = useCrewWorkLayoutStore(store => store.set);

    useEffect(() => {
        set(state =>
            mergeWith(state, ssrState, (_, srcValue, key) => {
                if (key === 'description') {
                    return '';
                }
                return isArray(srcValue) ? srcValue : undefined;
            })
        );
    }, []);

    return null;
};

export default MergeSsrStateIntoCrewWorkLayoutStore;
