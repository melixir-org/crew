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
        storeRef.current = createPageStore(initialState ?? initPageState());
    }

    if (initialStateRef.current !== initialState) {
        if (initialState) {
            const currentPageState: PageState = storeRef.current.getState();
            const newPageState: PageState = initPageState();

            newPageState.server = initialState.server;
            newPageState.client = currentPageState.client;
            storeRef.current = createPageStore(newPageState);
        }
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
