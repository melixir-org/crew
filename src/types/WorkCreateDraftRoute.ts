import { createWork, Work } from './Work';

export type WorkCreateDraftRoute = {
    validationOn: boolean;
    work: Work;
};

export function createWorkCreateDraftRoute(): WorkCreateDraftRoute {
    return { validationOn: false, work: createWork() };
}
