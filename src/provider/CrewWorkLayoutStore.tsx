'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type Store, createStore, initState } from '@/store';

export type CrewWorkLayoutStoreApi = ReturnType<typeof createStore>;

export const CrewWorkLayoutStoreContext = createContext<
    CrewWorkLayoutStoreApi | undefined
>(undefined);

export interface CrewWorkLayoutStoreProviderProps {
    children: ReactNode;
}

export const CrewWorkLayoutStoreProvider = ({
    children,
}: CrewWorkLayoutStoreProviderProps) => {
    const ref = useRef<CrewWorkLayoutStoreApi>(undefined);

    if (!ref.current) {
        ref.current = createStore(initState());
    }

    return (
        <CrewWorkLayoutStoreContext.Provider value={ref.current}>
            {children}
        </CrewWorkLayoutStoreContext.Provider>
    );
};

export const useCrewWorkLayoutStore = <T,>(
    selector: (store: Store) => T
): T => {
    const context = useContext(CrewWorkLayoutStoreContext);

    if (!context) {
        throw new Error(
            `useCrewWorkLayoutStore must be used within CrewWorkLayoutStoreProvider`
        );
    }

    return useStore(context, selector);
};
