import { Crew } from './Crew';

export interface Work {
    id: string;
    title: string;
    description: string | undefined;
    crew: Crew | undefined;
}
