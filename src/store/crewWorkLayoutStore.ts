import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

import { CREW_ROUTE_GROUP_ROUTES, WORK_ROUTE_GROUP_ROUTES } from '@/app/routes';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import { DeepPartial } from '@/types/DeepPartial';
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
    };
};

export type CrewWorkLayoutActions = {
    setServer: (fn: (server: Server) => void) => void;
    addCrews: (crews: Crew[]) => void;
    addWorks: (works: Work[]) => void;
    setCrew: (crewId: string, fn: (state: Crew) => void) => void;
    setWork: (workId: string, fn: (state: Work) => void) => void;
    setCrewCreateDraftRoute: (
        pathname: string,
        fn: (state: CrewCreateDraftRoute) => void
    ) => void;
    setWorkCreateDraftRoute: (
        pathname: string,
        fn: (state: WorkCreateDraftRoute) => void
    ) => void;
    resetCrewCreateDraft: () => void;
    resetWorkCreateDraft: () => void;
};

export const initCrewWorkLayoutState = (
    partialState?: DeepPartial<CrewWorkLayoutState>
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
        },
    };

    mergeOverride(state, partialState);

    return state;
};

export type CrewWorkLayoutStore = CrewWorkLayoutState & CrewWorkLayoutActions;

export const createCrewWorkLayoutStore = (
    initialState: CrewWorkLayoutState
) => {
    return createStore<CrewWorkLayoutStore>()(
        immer(set => ({
            ...initialState,
            setServer: fn => {
                set(store => {
                    fn(store.server);
                });
            },
            addCrews: (crews: Crew[]) => {
                crews.forEach(crew => {
                    set(store => {
                        store.server.crews[crew.id] = crew;
                    });
                });
            },
            addWorks: (works: Work[]) => {
                works.forEach(work => {
                    set(store => {
                        store.server.works[work.id] = work;
                    });
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
            setCrewCreateDraftRoute: (pathname, fn) => {
                set(store => {
                    fn(store.client.crewCreateDraft[pathname]);
                });
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
        }))
    );
};
