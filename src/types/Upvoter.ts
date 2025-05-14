export interface Item {
    id: string;
    title: string;
    subtitle: string;
    url: string;
    upvoted?: boolean;
    upvotes?: [{ count: number }];
}

export interface UpvoterData {
    items: Item[];
    user_recent_votes: number;
    user_score: number;
}

export interface UpvoteData {
    url: string;
    user_recent_votes: number;
    user_score: number;
}
