'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import {
    type PageState,
    type PageStore,
    createPageStore,
    initPageState,
} from '@/store/pageStore';

export type PageStoreApi = ReturnType<typeof createPageStore>;

export const PageStoreContext = createContext<PageStoreApi | undefined>(
    undefined
);

export interface PageStoreProviderProps {
    children: ReactNode;
    initialState?: PageState;
}

export const PageStoreProvider = ({
    children,
    initialState,
}: PageStoreProviderProps) => {
    const initialStateRef = useRef<PageState>(initialState);
    const storeRef = useRef<PageStoreApi>(undefined);

    if (!storeRef.current) {
        storeRef.current = createPageStore(initPageState(initialState));
    }

    if (initialStateRef.current !== initialState && initialState) {
        const currentState: PageState = storeRef.current.getState();
        const newState: PageState = initPageState({
            server: initialState.server,
            client: currentState.client,
        });
        storeRef.current = createPageStore(newState);
        initialStateRef.current = initialState;
    }

    return (
        <PageStoreContext.Provider value={storeRef.current}>
            {children}
        </PageStoreContext.Provider>
    );
};

export const usePageStore = <T,>(selector: (store: PageStore) => T): T => {
    const context = useContext(PageStoreContext);

    if (!context) {
        throw new Error(`usePageStore must be used within PageStoreProvider`);
    }

    return useStore(context, selector);
};
