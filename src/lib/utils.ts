import { isPlainObject } from 'lodash-es';
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

function baseMerge(destination: unknown, source: unknown) {
    if (isPlainObject(source)) {
        const src = source as Record<string, unknown>;

        const dest = isPlainObject(destination)
            ? (destination as Record<string, unknown>)
            : {};

        Object.keys(src).forEach(key => {
            dest[key] = baseMerge(dest[key], src[key]);
        });

        return dest;
    }

    return source === undefined ? destination : source;
}

export function mergeOverride(destination: unknown, ...sources: unknown[]) {
    if (!isPlainObject(destination)) {
        throw new Error('destination must be a plain object');
    }

    sources.forEach(source => {
        baseMerge(destination, source);
    });
}

export const getRelativeTime = (date: Date | string): string => {
    const now = new Date();
    const givenDate = typeof date === 'string' ? new Date(date) : date;
    const diffInSeconds = Math.floor(
        (now.getTime() - givenDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
        return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
};

export function getFormattedTime(): string {
    const now = new Date();

    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');

    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');

    const timezoneOffset = '+00';

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${timezoneOffset}`;
}

export function getRouteGroup(pathname: string): RouteGroup {
    if (
        CREW_ROUTE_GROUP_ROUTES.find(route => pathname.endsWith(route.pathname))
    ) {
        return CREW_ROUTE_GROUP;
    }

    if (
        WORK_ROUTE_GROUP_ROUTES.find(route => pathname.endsWith(route.pathname))
    ) {
        return WORK_ROUTE_GROUP;
    }

    return null;
}

export function extractWorkId(pathname: string): string {
    const paths: string[] = pathname.split('/');

    if (paths.length >= 3 && paths[0] === '' && paths[1] === 'workspace') {
        return paths[2];
    }

    return '';
}

export function extractPathnameAfterWorkId(pathname: string): string {
    const paths: string[] = pathname.split('/');

    if (paths.length >= 4 && paths[0] === '' && paths[1] === 'workspace') {
        return '/' + paths.slice(3).join('/');
    }

    return '';
}
