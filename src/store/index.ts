import { createStore as createZustandStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

import { CREW_ROUTE_GROUP_ROUTES, WORK_ROUTE_GROUP_ROUTES } from '@/app/routes';
import { Crew } from '@/types/Crew';
import { CrewsMap } from '@/types/CrewMap';
import { CrewRouteGroupMap } from '@/types/CrewRouteGroupMap';
import { Work } from '@/types/Work';
import { WorkRouteGroupMap } from '@/types/WorkRouteGroupMap';
import { WorksMap } from '@/types/WorksMap';

export type State = {
    crews: CrewsMap;
    works: WorksMap;
    crewDraft: {
        routes: CrewRouteGroupMap;
    };
    workDraft: {
        routes: WorkRouteGroupMap;
    };
};

export type Actions = {
    set: (fn: (state: State) => void) => void;
    setCrews: (crews: Crew[]) => void;
    setWorks: (works: Work[]) => void;
    setCrewDraftValidationOn: (pathname: string, v: boolean) => void;
    resetCrewDraft: () => void;
    setWorkDraftValidationOn: (pathname: string, v: boolean) => void;
    resetWorkDraft: () => void;
};

export const initState = (): State => {
    const crewRouteGroupMap: CrewRouteGroupMap = {};
    const workRouteGroupMap: WorkRouteGroupMap = {};

    CREW_ROUTE_GROUP_ROUTES.forEach(route => {
        crewRouteGroupMap[route.pathname] = {
            validationOn: false,
            data: { id: '', title: '' },
        };
    });

    WORK_ROUTE_GROUP_ROUTES.forEach(route => {
        workRouteGroupMap[route.pathname] = {
            validationOn: false,
            data: { id: '', title: '', description: '' },
        };
    });

    return {
        crews: {},
        works: {},
        crewDraft: { routes: crewRouteGroupMap },
        workDraft: { routes: workRouteGroupMap },
    };
};

export type Store = State & Actions;

export const createStore = (initialState: State) => {
    return createZustandStore<Store>()(
        immer(set => ({
            ...initialState,
            set: fn => {
                set(state => {
                    fn(state);
                });
            },
            setCrews: (crews: Crew[]) => {
                crews.forEach(crew => {
                    set(state => {
                        state.crews[crew.id] = crew;
                    });
                });
            },
            setWorks: (works: Work[]) => {
                works.forEach(work => {
                    set(state => {
                        state.works[work.id] = work;
                    });
                });
            },
            setCrewDraftValidationOn: (pathname: string, v: boolean) => {
                set(state => {
                    state.crewDraft.routes[pathname].validationOn = v;
                });
            },
            resetCrewDraft: () => {
                set(state => {
                    state.crewDraft = initState().crewDraft;
                });
            },
            setWorkDraftValidationOn: (pathname: string, v: boolean) => {
                set(state => {
                    state.workDraft.routes[pathname].validationOn = v;
                });
            },
            resetWorkDraft: () => {
                set(state => {
                    state.workDraft = initState().workDraft;
                });
            },
        }))
    );
};
