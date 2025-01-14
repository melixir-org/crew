import { Work } from './Work';

export type WorkUpdateDraft = {
    validationOn: boolean;
    work: Work;
};

export function createWorkUpdateDraft(work: Work): WorkUpdateDraft {
    return { validationOn: false, work };
}
