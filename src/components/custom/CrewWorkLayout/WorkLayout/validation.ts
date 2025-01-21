import { Work } from '@/types/Work';

export function isWorkLayoutValid(work: Work): boolean {
    return work.title.length > 0;
}
