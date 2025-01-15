import { isArray } from 'lodash-es';

import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import WorkHome from '@/components/custom/WorkHome/WorkHome';
import { PageStoreProvider } from '@/provider/PageStore';
import { getWorkForWorkHomePage } from '@/lib/server-only-api';
import { initPageState, PageState } from '@/store/pageStore';
import type { Work } from '@/types/Work';

const Work = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { show = '' } = await searchParams;
    const workId = isArray(show) ? show[0] : show;

    const { data }: { data: Work | null } = await getWorkForWorkHomePage({
        workId,
    });

    let initialState: PageState | undefined = undefined;

    if (data && data.crew) {
        initialState = initPageState({
            server: {
                works: { [data.id]: data },
                crews: { [data.crew.id]: data.crew },
            },
        });
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initialState} />
            <WorkHome />
        </PageStoreProvider>
    );
};

export default Work;
