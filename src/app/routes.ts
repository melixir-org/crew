import { Route } from '@/types/Route';

export const WORKSPACE_ROUTE: Route = {
    name: 'workspace',
    pathname: '/workspace',
};

export const CREW_HOME_ROUTE: Route = {
    name: 'crew',
    pathname: '/crew',
};

export const WORK_HOME_ROUTE: Route = {
    name: 'work',
    pathname: '/work',
};

export const SETTINGS_ROUTE: Route = {
    name: 'settings',
    pathname: '/crew/settings',
};

export const LEVEL_ROUTE: Route = {
    name: 'level',
    pathname: '/work/level',
};

export const CREW_ROUTE_GROUP_ROUTES: Route[] = [
    CREW_HOME_ROUTE,
    SETTINGS_ROUTE,
];

export const WORK_ROUTE_GROUP_ROUTES: Route[] = [WORK_HOME_ROUTE, LEVEL_ROUTE];

export const ALL_ROUTES = [
    ...CREW_ROUTE_GROUP_ROUTES,
    ...WORK_ROUTE_GROUP_ROUTES,
];
