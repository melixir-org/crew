import { Crew } from './Crew';

export type CrewUpdateDraft = {
    validationOn: boolean;
    crew: Crew;
};

export function createCrewUpdateDraft(crew: Crew): CrewUpdateDraft {
    return { validationOn: false, crew };
}
