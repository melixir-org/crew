'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { type Store, createStore, initState } from '@/store';
import { CrewsMap } from '@/types/CrewMap';
import { WorksMap } from '@/types/WorksMap';

export type PageStoreApi = ReturnType<typeof createStore>;

export const PageStoreContext = createContext<PageStoreApi | undefined>(
    undefined
);

export interface PageStoreProviderProps {
    children: ReactNode;
    response?: {
        type: string;
        data: CrewsMap | WorksMap;
    };
}

export const PageStoreProvider = ({ children, response }: PageStoreProviderProps) => {
    const ref = useRef<PageStoreApi>(undefined);

    if (!ref.current) {
        ref.current = createStore(initState(response));
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
