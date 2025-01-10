import { isArray } from 'lodash-es';

import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import WorkHome from '@/components/custom/WorkHome/WorkHome';
import { PageStoreProvider } from '@/provider/PageStore';
import { getWorkForWorkHomePage } from '@/lib/server-only-api/work';
import type { Work } from '@/types/Work';
import { initPageState, PageState } from '@/store/pageStore';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Work: React.FC<PageProps> = async ({ searchParams }) => {
    const { show = '' } = await searchParams;
    const workId = isArray(show) ? show[0] : show;

    const initialState: PageState = initPageState();

    const { data }: { data: Work | null } = await getWorkForWorkHomePage({
        workId,
    });

    if (data) {
        initialState.works[data.id] = data;
    }

    if (data?.crew) {
        initialState.crews[data.crew.id] = data.crew;
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <MergeSsrStateIntoCrewWorkLayoutStore mergeState={initialState} />
            <WorkHome />
        </PageStoreProvider>
    );
};

export default Work;
