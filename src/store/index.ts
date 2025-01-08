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
    works: WorksMap;
    crews: CrewsMap;
    createCrew: {
        routes: CrewRouteGroupMap;
    };
    createWork: {
        routes: WorkRouteGroupMap;
    };
};

export type Actions = {
    addWorks: (works: Work[]) => void;
    addCrews: (crews: Crew[]) => void;
    set: (fn: (state: State) => void) => void;
};

const initCrew = (): Crew => ({
    id: '',
    title: '',
});

const initWork = (): Work => ({
    id: '',
    title: '',
    description: '',
});

export const initState = (): State => {
    const crewRouteGroupData: CrewRouteGroupMap = {};
    const workRouteGroupData: WorkRouteGroupMap = {};

    CREW_ROUTE_GROUP_ROUTES.forEach(route => {
        crewRouteGroupData[route.pathname] = initCrew();
    });

    WORK_ROUTE_GROUP_ROUTES.forEach(route => {
        workRouteGroupData[route.pathname] = initWork();
    });

    return {
        works: {},
        crews: {},
        createCrew: { routes: crewRouteGroupData },
        createWork: { routes: workRouteGroupData },
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
