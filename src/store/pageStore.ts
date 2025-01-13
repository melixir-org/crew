import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

import { mergeOverride } from './utils';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import { DeepPartial } from '@/types/DeepPartial';
import { CrewUpdateDraft } from '@/types/CrewUpdateDraft';
import {
    createWorkUpdateDraft,
    WorkUpdateDraft,
} from '@/types/WorkUpdateDraft';

type Server = {
    crews: { [key: string]: Crew };
    works: { [key: string]: Work };
};

export type PageState = {
    server: Server;
    client: {
        crewUpdateDrafts: { [key: string]: CrewUpdateDraft };
        workUpdateDrafts: { [key: string]: WorkUpdateDraft };
    };
};

export type PageActions = {
    setServer: (fn: (server: Server) => void) => void;
    setCrews: (crews: Crew[]) => void;
    setWorks: (works: Work[]) => void;
    setWork: (workId: string, fn: (state: Work) => void) => void;
    setCrewUpdateDraft: (
        crewId: string,
        fn: (state: CrewUpdateDraft) => void
    ) => void;
    getIsWorkUpdateDraftOn: (workId: string) => boolean;
    setWorkUpdateDraftOn: (workId: string, data: Work) => void;
    setWorkUpdateDraftOff: (workId: string) => void;
    setWorkUpdateDraft: (
        workId: string,
        fn: (state: WorkUpdateDraft) => void
    ) => void;
};

export const initPageState = (
    partialPageState?: DeepPartial<PageState>
): PageState => {
    const pageState: PageState = {
        server: { crews: {}, works: {} },
        client: { crewUpdateDrafts: {}, workUpdateDrafts: {} },
    };

    mergeOverride(pageState, partialPageState);

    return pageState;
};

export type PageStore = PageState & PageActions;

export const createPageStore = (initialState: PageState) => {
    return createStore<PageStore>()(
        immer((set, get) => ({
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
            setWork: (workId, fn) => {
                set(store => {
                    fn(store.server.works[workId]);
                });
            },
            setCrewUpdateDraft: (crewId, fn) => {
                set(store => {
                    fn(store.client.crewUpdateDrafts[crewId]);
                });
            },
            getIsWorkUpdateDraftOn: workId => {
                return Boolean(get().client.workUpdateDrafts[workId]);
            },
            setWorkUpdateDraftOn: (workId, data) => {
                set(store => {
                    store.client.workUpdateDrafts[workId] =
                        createWorkUpdateDraft(data);
                });
            },
            setWorkUpdateDraftOff: workId => {
                set(store => {
                    delete store.client.workUpdateDrafts[workId];
                });
            },
            setWorkUpdateDraft: (workId, fn) => {
                set(store => {
                    fn(store.client.workUpdateDrafts[workId]);
                });
            },
        }))
    );
};
