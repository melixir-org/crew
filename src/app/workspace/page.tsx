import { isArray } from 'lodash-es';

import Workspace from '@/components/custom/Workspace';
import { PageStoreProvider } from '@/provider/PageStore';
import { getCrewsApi, getUserApi } from '@/lib/server-only-api';
import { getWorksApi } from '@/lib/server-only-api';
import { initPageState, PageState } from '@/store/pageStore';
import { MY_CREW, THEIR_CREW } from '@/lib/constants';
import type { Crew } from '@/types/Crew';
import SessionWrapper from '@/provider/SessionWrapper';

interface PageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
    const {
        page_index = '0',
        page_size = '10',
        type = MY_CREW,
    } = await searchParams;

    const pi = isArray(page_index) ? Number(page_index[0]) : Number(page_index);
    const ps = isArray(page_size) ? Number(page_size[0]) : Number(page_size);
    const t = isArray(type) ? type[0] : type;

    const {
        data: { user },
    } = await getUserApi();

    let initialState: PageState = initPageState({
        server: { user },
    });

    const ids: string[] = [];
    let totalIds: number = 0;

    if (t === MY_CREW) {
        const { data, count }: { data: Crew[] | null; count: number | null } =
            await getCrewsApi(pi, ps);

        totalIds = count ?? 0;

        const crews: Record<string, Crew> = {};
        data?.forEach(crew => {
            crews[crew.id] = crew;
            ids.push(crew.id);
        });

        initialState = initPageState(initialState, { server: { crews } });
    }

    if (t === THEIR_CREW) {
        const { data, count }: { data: Crew[] | null; count: number | null } =
            await getWorksApi(pi, ps);

        totalIds = count ?? 0;

        const crews: Record<string, Crew> = {};
        data?.forEach(work => {
            crews[work.id] = work;
            ids.push(work.id);
        });

        initialState = initPageState(initialState, { server: { crews } });
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <SessionWrapper syncSessionIntoCrewWorkLayoutStore={false} />
            <Workspace ids={ids} totalIds={totalIds} />
        </PageStoreProvider>
    );
};

export default Page;
