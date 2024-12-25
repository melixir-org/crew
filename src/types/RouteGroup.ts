export const CREW_ROUTE_GROUP = 'CREW ROUTE GROUP';
export const WORK_ROUTE_GROUP = 'WORK ROUTE GROUP';

export type RouteGroup =
    | typeof CREW_ROUTE_GROUP
    | typeof WORK_ROUTE_GROUP
    | null;
