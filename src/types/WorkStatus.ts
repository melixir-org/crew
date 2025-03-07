export const TO_DO = 'TO-DO';
export const READY = 'READY';
export const PLANNING = 'PLANNING';
export const WIP = 'WIP';
export const REVIEW = 'REVIEW';
export const DONE = 'DONE';
export const CLOSED = 'CLOSED';

export type WorkStatus =
    | typeof TO_DO
    | typeof READY
    | typeof PLANNING
    | typeof WIP
    | typeof REVIEW
    | typeof DONE
    | typeof CLOSED;
