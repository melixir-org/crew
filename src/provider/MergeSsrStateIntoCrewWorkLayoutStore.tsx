'use client';

import { useEffect } from 'react';
import { isArray, isPlainObject, isUndefined, mergeWith } from 'lodash-es';

import { useCrewWorkLayoutStore } from './CrewWorkLayoutStore';
import { State } from '@/store';

const ignoreKeysAndReplaceWith: { [key: string]: Exclude<any, undefined> } = {
    description: '',
};

const MergeSsrStateIntoCrewWorkLayoutStore = ({
    ssrState,
}: {
    ssrState: State;
}) => {
    const set = useCrewWorkLayoutStore(store => store.set);

    useEffect(() => {
        set(state =>
            mergeWith(state, ssrState, (objValue, srcValue, key) => {
                if (!isUndefined(ignoreKeysAndReplaceWith[key])) {
                    return ignoreKeysAndReplaceWith[key];
                }
                if (isArray(srcValue)) {
                    return srcValue;
                }
                if (!isPlainObject(objValue) && isPlainObject(srcValue)) {
                    return srcValue;
                }
                return undefined;
            })
        );
    }, [ssrState]);

    return null;
};

export default MergeSsrStateIntoCrewWorkLayoutStore;
