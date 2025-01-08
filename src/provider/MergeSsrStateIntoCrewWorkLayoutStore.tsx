'use client';

import { useEffect } from 'react';
import { isArray, isPlainObject, mergeWith } from 'lodash-es';

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
            mergeWith(state, ssrState, (objValue, srcValue, key) => {
                if (key === 'description') {
                    return '';
                }
                if (isArray(srcValue)) {
                    return srcValue;
                }
                if (!isPlainObject(objValue) && isPlainObject(srcValue)) {
                    return srcValue;
                }
            })
        );
    }, []);

    return null;
};

export default MergeSsrStateIntoCrewWorkLayoutStore;
