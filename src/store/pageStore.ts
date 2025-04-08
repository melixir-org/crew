import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

import { mergeOverride } from '../lib/utils';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import { DeepPartial } from '@/types/DeepPartial';
import { CrewUpdateDraft } from '@/types/CrewUpdateDraft';
import {
    createWorkUpdateDraft,
    WorkUpdateDraft,
} from '@/types/WorkUpdateDraft';
import { User } from '@supabase/supabase-js';

type Server = {
    crews: Record<string, Crew>;
    works: Record<string, Work>;
    user: User | null;
};

export type PageState = {
    server: Server;
    client: {
        crewUpdateDrafts: Record<string, CrewUpdateDraft>;
        workUpdateDrafts: Record<string, WorkUpdateDraft>;
    };
};

export type PageActions = {
    setServer: (fn: (server: Server) => void) => void;

    addCrews: (crews: Crew[]) => void;
    addWorks: (works: Work[]) => void;
    setCrew: (crewId: string, fn: (state: Crew) => void) => void;
    setWork: (workId: string, fn: (state: Work) => void) => void;

    getIsWorkUpdateDraftOn: (workId: string) => boolean;
    setWorkUpdateDraftOn: (workId: string, data: Work) => void;
    setWorkUpdateDraftOff: (workId: string) => void;
    getWorkUpdateDraft: (workId: string) => WorkUpdateDraft;
    setWorkUpdateDraft: (
        workId: string,
        fn: (state: WorkUpdateDraft) => void
    ) => void;
};

export const initPageState = (
    ...partialPageState: DeepPartial<PageState | undefined>[]
): PageState => {
    const pageState: PageState = {
        server: { crews: {}, works: {}, user: null },
        client: { crewUpdateDrafts: {}, workUpdateDrafts: {} },
    };

    mergeOverride(pageState, ...partialPageState);

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
            addCrews: (crews: Crew[]) => {
                set(store => {
                    mergeOverride(
                        store.server.crews,
                        ...crews.map(crew => ({ [crew.id]: crew }))
                    );
                });
            },
            addWorks: (works: Work[]) => {
                set(store => {
                    mergeOverride(
                        store.server.works,
                        ...works.map(work => ({ [work.id]: work }))
                    );
                });
            },
            setCrew: (crewId, fn) => {
                set(store => {
                    fn(store.server.crews[crewId]);
                });
            },
            setWork: (workId, fn) => {
                set(store => {
                    fn(store.server.works[workId]);
                });
            },
            getIsWorkUpdateDraftOn: workId => {
                return Boolean(get().client.workUpdateDrafts[workId]);
            },
            setWorkUpdateDraftOn: (workId, work) => {
                set(store => {
                    store.client.workUpdateDrafts[workId] =
                        createWorkUpdateDraft(work);
                });
            },
            setWorkUpdateDraftOff: workId => {
                set(store => {
                    delete store.client.workUpdateDrafts[workId];
                });
            },
            getWorkUpdateDraft: workId => {
                return get().client.workUpdateDrafts[workId];
            },
            setWorkUpdateDraft: (workId, fn) => {
                set(store => {
                    fn(store.client.workUpdateDrafts[workId]);
                });
            },
        }))
    );
};
