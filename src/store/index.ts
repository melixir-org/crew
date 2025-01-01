import { Work } from '@/types/Work';
import { WorksMap } from '@/types/WorksMap';
import { createStore as createZustandStore } from 'zustand/vanilla';

export type State = {
    works: WorksMap;
};

export type Actions = {
    addWorks: (works: Work[]) => void;
};

export const initState = (): State => {
    return { works: {} };
};

export type Store = State & Actions;

export const createStore = (initState: State) => {
    return createZustandStore<Store>()(set => ({
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
