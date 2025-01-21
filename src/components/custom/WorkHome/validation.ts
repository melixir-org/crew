import { Work } from '@/types/Work';

export function isDescriptionValid(description: string) {
    return description.length > 0;
}

export function isWorkHomeValid(work: Work) {
    return isDescriptionValid(work.description ?? '');
}
