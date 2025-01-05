import { Crew } from './Crew';

export interface Work {
    id: string;
    title: string | undefined;
    description: string | undefined;
    crew: Crew | undefined;
}
