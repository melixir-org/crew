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

type Server = {
    crews: CrewsMap;
    works: WorksMap;
};

export type PageState = {
    server: Server;
    client: {
        crewUpdateDraft: CrewUpdateDraft;
        workUpdateDraft: WorkUpdateDraft;
    };
};

export type PageActions = {
    setServer: (fn: (server: Server) => void) => void;
    setCrews: (crews: Crew[]) => void;
    setWorks: (works: Work[]) => void;
    setCrewUpdateDraft: (fn: (state: CrewUpdateDraft) => void) => void;
    setWorkUpdateDraft: (fn: (state: WorkUpdateDraft) => void) => void;
};

export const initPageState = (): PageState => {
    return {
        server: { crews: {}, works: {} },
        client: {
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
        },
    };
};

export type PageStore = PageState & PageActions;

export const createPageStore = (initialState: PageState) => {
    return createStore<PageStore>()(
        immer(set => ({
            ...initialState,
            setServer: fn => {
                set(store => {
                    fn(store.server);
                });
            },
            setCrews: (crews: Crew[]) => {
                crews.forEach(crew => {
                    set(store => {
                        store.server.crews[crew.id] = crew;
                    });
                });
            },
            setWorks: (works: Work[]) => {
                works.forEach(work => {
                    set(store => {
                        store.server.works[work.id] = work;
                    });
                });
            },
            setCrewUpdateDraft: fn => {
                set(store => {
                    fn(store.client.crewUpdateDraft);
                });
            },
            setWorkUpdateDraft: fn => {
                set(store => {
                    fn(store.client.workUpdateDraft);
                });
            },
        }))
    );
};
