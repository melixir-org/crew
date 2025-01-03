'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { type Store, createStore, initState } from '@/store';

export type PageStoreApi = ReturnType<typeof createStore>;

export const PageStoreContext = createContext<PageStoreApi | undefined>(
    undefined
);

export interface PageStoreProviderProps {
    children: ReactNode;
}

export const PageStoreProvider = ({ children }: PageStoreProviderProps) => {
    const ref = useRef<PageStoreApi>(undefined);

    if (!ref.current) {
        ref.current = createStore(initState());
    }

    return (
        <PageStoreContext.Provider value={ref.current}>
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
