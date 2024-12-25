import { CREW_ROUTE_GROUP_ROUTES } from '@/app/routes';
import {
    CREW_ROUTE_GROUP,
    RouteGroup,
    WORK_ROUTE_GROUP,
} from '@/types/RouteGroup';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRouteGroup(pathname: string): RouteGroup {
    if (CREW_ROUTE_GROUP_ROUTES.find(route => route.pathname === pathname)) {
        return CREW_ROUTE_GROUP;
    }

    return WORK_ROUTE_GROUP;
}
