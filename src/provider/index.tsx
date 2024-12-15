'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type GlobalStore, createGlobalStore, initGlobalState } from '@/store';

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
    undefined
);

export interface GlobalStoreProviderProps {
    children: ReactNode;
}

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
    const ref = useRef<GlobalStoreApi>();

    if (!ref.current) {
        ref.current = createGlobalStore(initGlobalState());
    }

    return (
        <GlobalStoreContext.Provider value={ref.current}>
            {children}
        </GlobalStoreContext.Provider>
    );
};

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
    const context = useContext(GlobalStoreContext);

    if (!context) {
        throw new Error(
            `useGlobalStore must be used within GlobalStoreProvider`
        );
    }

    return useStore(context, selector);
};
