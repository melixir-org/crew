export interface Crew {
    id: string;
    root_work : {
        id: string;
        title: string;
        description: string;
    } | null;
}