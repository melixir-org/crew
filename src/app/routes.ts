import { Route } from '@/types/Route';

export const HOME_ROUTE: Route = {
    name: 'home',
    pathname: '/',
};

export const AUTH_ROUTE: Route = {
    name: 'auth',
    pathname: '/auth',
};

export const CALLBACK_ROUTE: Route = {
    name: 'callback',
    pathname: '/callback',
};

export const ERROR_ROUTE: Route = {
    name: 'error',
    pathname: '/error',
};

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

export const MEMBERS_ROUTE: Route = {
    name: 'members',
    pathname: '/crew/members',
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
    MEMBERS_ROUTE,
];

export const WORK_ROUTE_GROUP_ROUTES: Route[] = [WORK_HOME_ROUTE, LEVEL_ROUTE];

export const ALL_ROUTES = [
    HOME_ROUTE,
    AUTH_ROUTE,
    CALLBACK_ROUTE,
    ERROR_ROUTE,
    WORKSPACE_ROUTE,
    ...CREW_ROUTE_GROUP_ROUTES,
    ...WORK_ROUTE_GROUP_ROUTES,
];
