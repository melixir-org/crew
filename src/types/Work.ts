import { Crew } from './Crew';

export interface Work {
    id: string;
    title: string;
    description: string;
    crew: Crew | undefined;
}
