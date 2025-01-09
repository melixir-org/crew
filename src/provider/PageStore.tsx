'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { State, type Store, createStore, initState } from '@/store';

export type PageStoreApi = ReturnType<typeof createStore>;

export const PageStoreContext = createContext<PageStoreApi | undefined>(
    undefined
);

export interface PageStoreProviderProps {
    children: ReactNode;
    initialState?: State;
}

export const PageStoreProvider = ({
    children,
    initialState,
}: PageStoreProviderProps) => {
    const initialStateRef = useRef(initialState);
    const storeRef = useRef<PageStoreApi>(undefined);

    if (initialStateRef.current !== initialState || !storeRef.current) {
        storeRef.current = createStore(initialState ?? initState());
        initialStateRef.current = initialState;
    }

    return (
        <PageStoreContext.Provider value={storeRef.current}>
            {children}
        </PageStoreContext.Provider>
    );
};

export const usePageStore = <T,>(selector: (store: Store) => T): T => {
    const context = useContext(PageStoreContext);

    if (!context) {
        throw new Error(`usePageStore must be used within PageStoreProvider`);
    }

    return useStore(context, selector);
};
