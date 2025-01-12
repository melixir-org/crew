import { createWork, Work } from './Work';

export type WorkUpdateDraft = {
    validationOn: boolean;
    data: Work;
};

export function createWorkUpdateDraft(data: Work): WorkUpdateDraft {
    return { validationOn: false, data };
}
