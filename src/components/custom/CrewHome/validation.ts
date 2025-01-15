import { Crew } from '@/types/Crew';

export function isDescriptionValid(description: string) {
    return description.length > 0;
}

export function isCrewHomeValid(crew: Crew) {
    return isDescriptionValid(crew.root_work?.description ?? '');
}
