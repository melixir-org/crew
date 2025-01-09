import { Crew } from './Crew';

export type CrewRouteGroupMap = {
    [key: string]: { validationOn: boolean; data: Crew };
};
