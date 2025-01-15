import { isArray, isPlainObject, mergeWith } from 'lodash-es';

export function mergeOverride(
    a: object,
    ...b: (object | undefined | null)[]
): void {
    mergeWith(a, ...b, (objValue: any, srcValue: any) => {
        if (isArray(srcValue)) {
            return srcValue;
        }
        if (!isPlainObject(objValue) && isPlainObject(srcValue)) {
            return srcValue;
        }
    });
}

const getRelativeTime = (date: Date | string): string => {
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

export default getRelativeTime;
