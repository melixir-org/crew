import { Work } from './Work';

export interface Crew {
    id: string;
    root_work: Work | undefined;
}
