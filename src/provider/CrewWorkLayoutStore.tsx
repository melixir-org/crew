'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
    type CrewWorkLayoutStore,
    createCrewWorkLayoutStore,
    initCrewWorkLayoutState,
} from '@/store/crewWorkLayoutStore';

export type CrewWorkLayoutStoreApi = ReturnType<
    typeof createCrewWorkLayoutStore
>;

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
        ref.current = createCrewWorkLayoutStore(initCrewWorkLayoutState());
    }

    return (
        <CrewWorkLayoutStoreContext.Provider value={ref.current}>
            {children}
        </CrewWorkLayoutStoreContext.Provider>
    );
};

export const useCrewWorkLayoutStore = <T,>(
    selector: (store: CrewWorkLayoutStore) => T
): T => {
    const context = useContext(CrewWorkLayoutStoreContext);

    if (!context) {
        throw new Error(
            `useCrewWorkLayoutStore must be used within CrewWorkLayoutStoreProvider`
        );
    }

    return useStore(context, selector);
};
