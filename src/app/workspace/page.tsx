import { isArray } from 'lodash-es';

import Workspace from '@/components/custom/Workspace/Workspace';
import { PageStoreProvider } from '@/provider/PageStore';
import { getCrews } from '@/lib/server-only-api/crew';
import { getWorks } from '@/lib/server-only-api/work';
import { initPageState, PageState } from '@/store/pageStore';
import { CREW, WORK } from '@/lib/constants';
import type { Crew } from '@/types/Crew';
import type { CrewsMap } from '@/types/CrewMap';
import type { Work } from '@/types/Work';
import type { WorksMap } from '@/types/WorksMap';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

    let initialState: PageState | undefined = undefined;
    const ids: string[] = [];

    if (t === CREW) {
        const { data }: { data: Crew[] | null } = await getCrews(pi, ps);

        const crews: CrewsMap = {};
        data?.forEach(crew => {
            crews[crew.id] = crew;
            ids.push(crew.id);
        });

        initialState = initPageState({ server: { crews } });
    }

    if (t === WORK) {
        const { data }: { data: Work[] | null } = await getWorks(pi, ps);

        const works: WorksMap = {};
        data?.forEach(work => {
            works[work.id] = work;
            ids.push(work.id);
        });

        initialState = initPageState({ server: { works } });
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <Workspace ids={ids} />
        </PageStoreProvider>
    );
};

export default Page;
