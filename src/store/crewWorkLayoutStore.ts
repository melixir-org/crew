import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

import { CREW_ROUTE_GROUP_ROUTES, WORK_ROUTE_GROUP_ROUTES } from '@/app/routes';
import { createCrew, Crew } from '@/types/Crew';
import { createWork, Work } from '@/types/Work';
import { WorksMap } from '@/types/WorksMap';
import { CrewsMap } from '@/types/CrewMap';
import { mergeOverride } from './utils';
import { DeepPartial } from '@/types/DeepPartial';

type CrewRouteGroupCreateDraftMap = {
    [key: string]: { validationOn: boolean; data: Crew };
};

type WorkRouteGroupCreateDraftMap = {
    [key: string]: { validationOn: boolean; data: Work };
};

type Server = {
    crews: CrewsMap;
    works: WorksMap;
};

export type CrewWorkLayoutState = {
    server: Server;
    client: {
        crewCreateDraft: {
            routes: CrewRouteGroupCreateDraftMap;
        };
        workCreateDraft: {
            routes: WorkRouteGroupCreateDraftMap;
        };
    };
};

export type CrewWorkLayoutActions = {
    setServer: (fn: (server: Server) => void) => void;
    setCrews: (crews: Crew[]) => void;
    setWorks: (works: Work[]) => void;
    setCrewCreateDraft: (
        fn: (state: { routes: CrewRouteGroupCreateDraftMap }) => void
    ) => void;
    setWorkCreateDraft: (
        fn: (state: { routes: WorkRouteGroupCreateDraftMap }) => void
    ) => void;
    resetCrewCreateDraft: () => void;
    resetWorkCreateDraft: () => void;
};

export const initCrewWorkLayoutState = (
    partialState?: DeepPartial<CrewWorkLayoutState>
): CrewWorkLayoutState => {
    const CrewRouteGroupCreateDraftMap: CrewRouteGroupCreateDraftMap = {};
    const WorkRouteGroupCreateDraftMap: WorkRouteGroupCreateDraftMap = {};

    CREW_ROUTE_GROUP_ROUTES.forEach(route => {
        CrewRouteGroupCreateDraftMap[route.pathname] = {
            validationOn: false,
            data: createCrew(),
        };
    });

    WORK_ROUTE_GROUP_ROUTES.forEach(route => {
        WorkRouteGroupCreateDraftMap[route.pathname] = {
            validationOn: false,
            data: createWork(),
        };
    });

    const state: CrewWorkLayoutState = {
        server: { crews: {}, works: {} },
        client: {
            crewCreateDraft: { routes: CrewRouteGroupCreateDraftMap },
            workCreateDraft: { routes: WorkRouteGroupCreateDraftMap },
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
            setCrewCreateDraft: fn => {
                set(store => {
                    fn(store.client.crewCreateDraft);
                });
            },
            setWorkCreateDraft: fn => {
                set(store => {
                    fn(store.client.workCreateDraft);
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
