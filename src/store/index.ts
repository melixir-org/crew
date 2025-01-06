import { Crew } from '@/types/Crew';
import { CrewsMap } from '@/types/CrewMap';
import { Work } from '@/types/Work';
import { WorksMap } from '@/types/WorksMap';
import { isArray, mergeWith } from 'lodash-es';
import { immer } from 'zustand/middleware/immer';
import { createStore as createZustandStore } from 'zustand/vanilla';

export type State = {
    works: WorksMap;
    crews: CrewsMap;
};

export type Actions = {
    addWorks: (works: Work[]) => void;
    addCrews: (crews: Crew[]) => void;
    merge: (state: State) => void;
};

export const initState = (): State => {
    return { works: {}, crews: {} };
};

export type Store = State & Actions;

export const createStore = (initialState: State) => {
    return createZustandStore<Store>()(
        immer(set => ({
            ...initialState,
            merge: (payload: State) => {
                set(state => {
                    mergeWith(state, payload, (_, b) =>
                        isArray(b) ? b : undefined
                    );
                });
            },
            addWorks: (works: Work[]) => {
                works.forEach(work => {
                    set(state => {
                        state.works[work.id] = work;
                    });
                });
            },
            addCrews: (crews: Crew[]) => {
                crews.forEach(crew => {
                    set(state => {
                        state.crews[crew.id] = crew;
                    });
                });
            },
        }))
    );
};
