import { Work } from './Work';

export interface WorkUpdateDraft {
    validationOn: boolean;
    work: Work;
}

export function createWorkUpdateDraft(work: Work): WorkUpdateDraft {
    return { validationOn: false, work };
}
