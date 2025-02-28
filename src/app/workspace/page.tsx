import { isArray } from 'lodash-es';

import Workspace from '@/components/custom/Workspace/Workspace';
import { PageStoreProvider } from '@/provider/PageStore';
import { getCrewsApi, getValidatedUserApi } from '@/lib/server-only-api';
import { getWorksApi } from '@/lib/server-only-api';
import { initPageState, PageState } from '@/store/pageStore';
import { CREW, WORK } from '@/lib/constants';
import type { Crew } from '@/types/Crew';
import type { Work } from '@/types/Work';
import SessionWrapper from '@/provider/SessionWrapper';

interface PageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
    const {
        page_index = '0',
        page_size = '10',
        type = WORK,
    } = await searchParams;

    const pi = isArray(page_index) ? Number(page_index[0]) : Number(page_index);
    const ps = isArray(page_size) ? Number(page_size[0]) : Number(page_size);
    const t = isArray(type) ? type[0] : type;

    const {
        data: { user },
    } = await getValidatedUserApi();

    let initialState: PageState = initPageState({
        server: { user },
    });

    const ids: string[] = [];

    if (t === CREW) {
        const { data }: { data: Crew[] | null } = await getCrewsApi(pi, ps);

        const crews: Record<string, Crew> = {};
        data?.forEach(crew => {
            crews[crew.id] = crew;
            ids.push(crew.id);
        });

        initialState = initPageState(initialState, { server: { crews } });
    }

    if (t === WORK) {
        const { data }: { data: Work[] | null } = await getWorksApi(pi, ps);

        const works: Record<string, Work> = {};
        data?.forEach(work => {
            works[work.id] = work;
            ids.push(work.id);
        });

        initialState = initPageState(initialState, { server: { works } });
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <SessionWrapper />
            <Workspace ids={ids} />
        </PageStoreProvider>
    );
};

export default Page;
