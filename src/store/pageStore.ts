import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

import { createCrew, Crew } from '@/types/Crew';
import { CrewsMap } from '@/types/CrewMap';
import { createWork, Work } from '@/types/Work';
import { WorksMap } from '@/types/WorksMap';

type CrewUpdateDraft = {
    on: boolean;
    validationOn: boolean;
    data: Crew;
};

type WorkUpdateDraft = {
    on: boolean;
    validationOn: boolean;
    data: Work;
};

export type PageState = {
    crews: CrewsMap;
    works: WorksMap;
    crewUpdateDraft: CrewUpdateDraft;
    workUpdateDraft: WorkUpdateDraft;
};

export type PageActions = {
    set: (fn: (state: PageState) => void) => void;
    setCrews: (crews: Crew[]) => void;
    setWorks: (works: Work[]) => void;
    setCrewUpdateDraft: (fn: (state: CrewUpdateDraft) => void) => void;
    setWorkUpdateDraft: (fn: (state: WorkUpdateDraft) => void) => void;
};

export const initPageState = (): PageState => {
    return {
        crews: {},
        works: {},
        crewUpdateDraft: {
            on: false,
            validationOn: false,
            data: createCrew(),
        },
        workUpdateDraft: {
            on: false,
            validationOn: false,
            data: createWork(),
        },
    };
};

export type PageStore = { state: PageState } & { actions: PageActions };

export const createPageStore = (initialState: PageState) => {
    return createStore<PageStore>()(
        immer(set => ({
            state: initialState,
            actions: {
                set: fn => {
                    set(store => {
                        fn(store.state);
                    });
                },
                setCrews: (crews: Crew[]) => {
                    crews.forEach(crew => {
                        set(store => {
                            store.state.crews[crew.id] = crew;
                        });
                    });
                },
                setWorks: (works: Work[]) => {
                    works.forEach(work => {
                        set(store => {
                            store.state.works[work.id] = work;
                        });
                    });
                },
                setCrewUpdateDraft: fn => {
                    set(store => {
                        fn(store.state.crewUpdateDraft);
                    });
                },
                setWorkUpdateDraft: fn => {
                    set(store => {
                        fn(store.state.workUpdateDraft);
                    });
                },
            },
        }))
    );
};
