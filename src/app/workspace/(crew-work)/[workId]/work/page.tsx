import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import WorkHome from '@/components/custom/WorkHome/WorkHome';
import { PageStoreProvider } from '@/provider/PageStore';
import { getWorkForWorkHomePageApi } from '@/lib/server-only-api';
import { initPageState, PageState } from '@/store/pageStore';
import type { Work } from '@/types/Work';

const Work = async ({ params }: { params: Promise<{ workId: string }> }) => {
    const { workId } = await params;

    const { data }: { data: Work | null } = await getWorkForWorkHomePageApi({
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
