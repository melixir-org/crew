'use client';

import { useEffect } from 'react';

import { useCrewWorkLayoutStore } from './CrewWorkLayoutStore';
import { mergeOverride } from '@/store/utils';
import { DeepPartial } from '@/types/DeepPartial';
import { PageState } from '@/store/pageStore';

// SSR state is always up-to-date with the server
// Merging SSR state into CrewWorkLayoutStore keeps the store in sync with the server
const MergeSsrStateIntoCrewWorkLayoutStore = ({
    ssrState,
}: {
    ssrState?: DeepPartial<PageState>;
}) => {
    console.log('abc');
    const { server, setServer } = useCrewWorkLayoutStore(store => store);
    console.log('Merge', server);
    useEffect(() => {
        setServer(server => mergeOverride(server, ssrState?.server));
    }, [ssrState]);

    return null;
};

export default MergeSsrStateIntoCrewWorkLayoutStore;
