'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type Store, createStore, initState } from '@/store';

export type CrewStoreApi = ReturnType<typeof createStore>;

export const CrewStoreContext = createContext<CrewStoreApi | undefined>(
    undefined
);

export interface CrewStoreProviderProps {
    children: ReactNode;
}

export const CrewStoreProvider = ({ children }: CrewStoreProviderProps) => {
    const ref = useRef<CrewStoreApi>();

    if (!ref.current) {
        ref.current = createStore(initState());
    }

    return (
        <CrewStoreContext.Provider value={ref.current}>
            {children}
        </CrewStoreContext.Provider>
    );
};

export const useCrewStore = <T,>(selector: (store: Store) => T): T => {
    const context = useContext(CrewStoreContext);

    if (!context) {
        throw new Error(`useCrewStore must be used within CrewStoreProvider`);
    }

    return useStore(context, selector);
};
