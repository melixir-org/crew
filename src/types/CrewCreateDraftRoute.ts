import { createCrew, Crew } from './Crew';
import { createWork, Work } from './Work';

export type CrewCreateDraftRoute = {
    validationOn: boolean;
    crew: Crew;
    work: Work;
};

export function createCrewCreateDraftRoute(): CrewCreateDraftRoute {
    return { validationOn: false, crew: createCrew(), work: createWork() };
}
