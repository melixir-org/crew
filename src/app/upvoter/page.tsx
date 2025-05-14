import ItemList from '@/components/upvoter/item-list';
import {
    getUpvoterItemsApi,
    getUserApi,
    getUserItemApi,
} from '@/lib/server-only-api';
import { Item, UpvoterData } from '@/types/Upvoter';

export default async function Page() {
    const { data: upvoterData }: { data: UpvoterData | null } =
        await getUpvoterItemsApi();

    const { data: userItemData }: { data: Item | null } =
        await getUserItemApi();

    console.log(userItemData);

    const {
        data: { user },
    } = await getUserApi();

    return (
        <main className="container mx-auto px-4 py-6 max-w-3xl">
            <div className="bg-white text-black rounded-lg shadow-xl p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Upvoter</h1>
                {upvoterData && (
                    <ItemList
                        items={upvoterData.items}
                        recentVotes={upvoterData.user_recent_votes}
                        score={upvoterData.user_score}
                        userItem={userItemData}
                        user={user}
                    />
                )}
            </div>
        </main>
    );
}
