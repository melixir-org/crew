import { createStore as createZustandStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

import { CREW_ROUTE_GROUP_ROUTES, WORK_ROUTE_GROUP_ROUTES } from '@/app/routes';
import { createCrew, Crew } from '@/types/Crew';
import { CrewsMap } from '@/types/CrewMap';
import { createWork, Work } from '@/types/Work';
import { WorksMap } from '@/types/WorksMap';

type CrewRouteGroupCreateDraftMap = {
    [key: string]: { validationOn: boolean; data: Crew };
};

type WorkRouteGroupCreateDraftMap = {
    [key: string]: { validationOn: boolean; data: Work };
};

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

export type State = {
    crews: CrewsMap;
    works: WorksMap;
    crewCreateDraft: {
        routes: CrewRouteGroupCreateDraftMap;
    };
    workCreateDraft: {
        routes: WorkRouteGroupCreateDraftMap;
    };
    crewUpdateDraft: CrewUpdateDraft;
    workUpdateDraft: WorkUpdateDraft;
};

export type Actions = {
    set: (fn: (state: State) => void) => void;
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
    setCrewUpdateDraft: (fn: (state: CrewUpdateDraft) => void) => void;
    setWorkUpdateDraft: (fn: (state: WorkUpdateDraft) => void) => void;
};

export const initState = (): State => {
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

    return {
        crews: {},
        works: {},
        crewCreateDraft: { routes: CrewRouteGroupCreateDraftMap },
        workCreateDraft: { routes: WorkRouteGroupCreateDraftMap },
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

export type Store = { state: State } & { actions: Actions };

export const createStore = (initialState: State) => {
    return createZustandStore<Store>()(
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
                setCrewCreateDraft: fn => {
                    set(store => {
                        fn(store.state.crewCreateDraft);
                    });
                },
                setWorkCreateDraft: fn => {
                    set(store => {
                        fn(store.state.workCreateDraft);
                    });
                },
                resetCrewCreateDraft: () => {
                    set(store => {
                        store.state.crewCreateDraft =
                            initialState.crewCreateDraft;
                    });
                },
                resetWorkCreateDraft: () => {
                    set(store => {
                        store.state.workCreateDraft =
                            initialState.workCreateDraft;
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
