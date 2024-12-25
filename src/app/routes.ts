import { Route } from '@/types/Route';

export const WORKSPACE_ROUTE: Route = {
    name: 'workspace',
    pathname: '/workspace',
};

export const CREW_ROUTE: Route = {
    name: 'crew',
    pathname: '/workspace/crew',
};

export const WORK_ROUTE: Route = {
    name: 'work',
    pathname: '/workspace/work',
};

export const SETTINGS_ROUTE: Route = {
    name: 'settings',
    pathname: '/workspace/settings',
};

export const CREW_ROUTE_GROUP_ROUTES: Route[] = [CREW_ROUTE, SETTINGS_ROUTE];
export const WORK_ROUTE_GROUP_ROUTES: Route[] = [WORK_ROUTE];
