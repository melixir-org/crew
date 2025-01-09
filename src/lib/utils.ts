import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CREW_ROUTE_GROUP_ROUTES, WORK_ROUTE_GROUP_ROUTES } from '@/app/routes';
import {
    CREW_ROUTE_GROUP,
    RouteGroup,
    WORK_ROUTE_GROUP,
} from '@/types/RouteGroup';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRouteGroup(pathname: string): RouteGroup {
    if (CREW_ROUTE_GROUP_ROUTES.find(route => route.pathname === pathname)) {
        return CREW_ROUTE_GROUP;
    }

    if (WORK_ROUTE_GROUP_ROUTES.find(route => route.pathname === pathname)) {
        return WORK_ROUTE_GROUP;
    }

    return null;
}
