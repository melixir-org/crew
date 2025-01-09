import { Work } from './Work';

export type WorkRouteGroupMap = {
    [key: string]: { validationOn: boolean; data: Work };
};
