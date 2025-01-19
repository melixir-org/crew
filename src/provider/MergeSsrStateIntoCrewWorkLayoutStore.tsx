'use client';

import { useEffect } from 'react';

import { useCrewWorkLayoutStore } from './CrewWorkLayoutStore';
import { mergeOverride } from '@/lib/utils';
import { DeepPartial } from '@/types/DeepPartial';
import { PageState } from '@/store/pageStore';

// SSR state is always up-to-date with the server
// Merging SSR state into CrewWorkLayoutStore keeps the store in sync with the server
const MergeSsrStateIntoCrewWorkLayoutStore = ({
    ssrState,
}: {
    ssrState?: DeepPartial<PageState>;
}) => {
    const { setServer } = useCrewWorkLayoutStore(store => store);

    useEffect(() => {
        setServer(server => mergeOverride(server, ssrState?.server));
    }, [ssrState]);

    return null;
};

export default MergeSsrStateIntoCrewWorkLayoutStore;
