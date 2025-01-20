import { Crew } from '@/types/Crew';

export function isCrewLayoutValid(crew: Crew): boolean {
    return crew.title.length > 0;
}
