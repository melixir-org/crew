import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

import { CREW_ROUTE_GROUP_ROUTES, WORK_ROUTE_GROUP_ROUTES } from '@/app/routes';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import { DeepPartial } from '@/types/DeepPartial';
import {
    createCrewUpdateDraft,
    CrewUpdateDraft,
} from '@/types/CrewUpdateDraft';
import {
    createWorkUpdateDraft,
    WorkUpdateDraft,
} from '@/types/WorkUpdateDraft';
import {
    createWorkCreateDraftRoute,
    WorkCreateDraftRoute,
} from '@/types/WorkCreateDraftRoute';
import {
    createCrewCreateDraftRoute,
    CrewCreateDraftRoute,
} from '@/types/CrewCreateDraftRoute';
import { mergeOverride } from '@/store/utils';

type CrewCreateDraft = {
    [key: string]: CrewCreateDraftRoute;
};

type WorkCreateDraft = {
    [key: string]: WorkCreateDraftRoute;
};

type Server = {
    crews: { [key: string]: Crew };
    works: { [key: string]: Work };
};

export type CrewWorkLayoutState = {
    server: Server;
    client: {
        crewCreateDraft: CrewCreateDraft;
        workCreateDraft: WorkCreateDraft;
        crewUpdateDrafts: { [key: string]: CrewUpdateDraft };
        workUpdateDrafts: { [key: string]: WorkUpdateDraft };
    };
};

export type CrewWorkLayoutActions = {
    setServer: (fn: (server: Server) => void) => void;
    addCrews: (crews: Crew[]) => void;
    addWorks: (works: Work[]) => void;
    setCrew: (crewId: string, fn: (state: Crew) => void) => void;
    setWork: (workId: string, fn: (state: Work) => void) => void;
    getCrewCreateDraftRoute: (pathname: string) => CrewCreateDraftRoute;
    setCrewCreateDraftRoute: (
        pathname: string,
        fn: (state: CrewCreateDraftRoute) => void
    ) => void;
    getWorkCreateDraftRoute: (pathname: string) => WorkCreateDraftRoute;
    setWorkCreateDraftRoute: (
        pathname: string,
        fn: (state: WorkCreateDraftRoute) => void
    ) => void;
    resetCrewCreateDraft: () => void;
    resetWorkCreateDraft: () => void;
    getIsCrewUpdateDraftOn: (crewId: string) => boolean;
    setCrewUpdateDraftOn: (crewId: string, data: Work) => void;
    setCrewUpdateDraftOff: (crewId: string) => void;
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

export const initCrewWorkLayoutState = (
    ...partialState: DeepPartial<CrewWorkLayoutState | undefined>[]
): CrewWorkLayoutState => {
    const crewRoutes: CrewCreateDraft = {};
    const workRoutes: WorkCreateDraft = {};

    CREW_ROUTE_GROUP_ROUTES.forEach(route => {
        crewRoutes[route.pathname] = createCrewCreateDraftRoute();
    });

    WORK_ROUTE_GROUP_ROUTES.forEach(route => {
        workRoutes[route.pathname] = createWorkCreateDraftRoute();
    });

    const state: CrewWorkLayoutState = {
        server: { crews: {}, works: {} },
        client: {
            crewCreateDraft: crewRoutes,
            workCreateDraft: workRoutes,
            crewUpdateDrafts: {},
            workUpdateDrafts: {},
        },
    };

    mergeOverride(state, ...partialState);

    return state;
};

export type CrewWorkLayoutStore = CrewWorkLayoutState & CrewWorkLayoutActions;

export const createCrewWorkLayoutStore = (
    initialState: CrewWorkLayoutState
) => {
    return createStore<CrewWorkLayoutStore>()(
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
            getCrewCreateDraftRoute: pathname => {
                return get().client.crewCreateDraft[pathname];
            },
            setCrewCreateDraftRoute: (pathname, fn) => {
                set(store => {
                    fn(store.client.crewCreateDraft[pathname]);
                });
            },
            getWorkCreateDraftRoute: pathname => {
                return get().client.workCreateDraft[pathname];
            },
            setWorkCreateDraftRoute: (pathname, fn) => {
                set(store => {
                    fn(store.client.workCreateDraft[pathname]);
                });
            },
            resetCrewCreateDraft: () => {
                set(store => {
                    store.client.crewCreateDraft =
                        initialState.client.crewCreateDraft;
                });
            },
            resetWorkCreateDraft: () => {
                set(store => {
                    store.client.workCreateDraft =
                        initialState.client.workCreateDraft;
                });
            },
            getIsCrewUpdateDraftOn: crewId => {
                return Boolean(get().client.crewUpdateDrafts[crewId]);
            },
            setCrewUpdateDraftOn: (crewId, data) => {
                set(store => {
                    store.client.crewUpdateDrafts[crewId] =
                        createCrewUpdateDraft(data);
                });
            },
            setCrewUpdateDraftOff: crewId => {
                set(store => {
                    delete store.client.crewUpdateDrafts[crewId];
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
