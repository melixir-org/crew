import { Crew } from '@/types/Crew';
import { CrewsMap } from '@/types/CrewMap';
import { Work } from '@/types/Work';
import { WorksMap } from '@/types/WorksMap';
import { createStore as createZustandStore } from 'zustand/vanilla';

export type State = {
    works: WorksMap;
    crews : CrewsMap;
};

export type Actions = {
    addWorks: (works: Work[]) => void;
    addCrews: (crews: Crew[]) => void;
};

export const initState = (): State => {
    return { works: {}, crews: {} };
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
        addCrews: (crews: Crew[]) => {
            crews.forEach((crew: Crew) => {
                set(state => ({
                    ...state,
                    crews: {
                        ...state.crews,
                        [crew.id]: crew,
                    },
                }));
            });
        },
    }));
};
