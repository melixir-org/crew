import { createCrew, Crew } from './Crew';

export type CrewUpdateDraft = {
    validationOn: boolean;
    data: Crew;
};

export function createCrewUpdateDraft(data: Crew): CrewUpdateDraft {
    return { validationOn: false, data };
}
