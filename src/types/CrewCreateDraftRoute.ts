import { createCrew, Crew } from './Crew';
import { createWork } from './Work';

export interface CrewCreateDraftRoute {
    validationOn: boolean;
    crew: Crew;
}

export function createCrewCreateDraftRoute(): CrewCreateDraftRoute {
    return {
        validationOn: false,
        crew: createCrew({ root_work: createWork() }),
    };
}
