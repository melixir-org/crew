import { isArray } from 'lodash-es';
import { getWorkWithCrewMetaData } from '@/lib/server-only-api/crew';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { createWork, type Work } from '@/types/Work';
import { initPageState, type PageState } from '@/store/pageStore';
import { createCrew } from '@/types/Crew';
import { initCrewWorkLayoutState } from '@/store/crewWorkLayoutStore';

const Crew = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { show = '' } = await searchParams;
    const workId = isArray(show) ? show[0] : show;

    const initialState: PageState = initPageState();

    const { data }: { data: Work | null } = await getWorkWithCrewMetaData({
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
            <div>Crew</div>
        </PageStoreProvider>
    );
};

export default Crew;
