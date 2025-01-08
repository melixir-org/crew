import { Work } from './Work';

export interface Crew {
    id: string;
    title: string;
    root_work?: Work;
}
