import { Work } from '@/types/Work';
import { WorksMap } from '@/types/WorksMap';
import { createStore } from 'zustand/vanilla';

export type GlobalState = {
    works: WorksMap;
};

export type GlobalActions = {
    addWorks: (works: Work[]) => void;
};

export const initGlobalState = (): GlobalState => {
    return { works: {} };
};

export type GlobalStore = GlobalState & GlobalActions;

export const createGlobalStore = (initState: GlobalState) => {
    return createStore<GlobalStore>()(set => ({
        ...initState,
        addWorks: (works: Work[]) => {
            works.forEach((work: Work) => {
                set(state => ({
                    ...state,
                    works: {
                        ...state.works,
                        [work.id]: work,
                    },
                }));
            });
        },
    }));
};
