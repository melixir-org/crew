import { createWork, Work } from './Work';

export interface WorkCreateDraftRoute {
    validationOn: boolean;
    work: Work;
}

export function createWorkCreateDraftRoute(): WorkCreateDraftRoute {
    return { validationOn: false, work: createWork() };
}
