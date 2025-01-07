import { isArray } from 'lodash-es';
import { getWorkWithCrewMetaData } from '@/lib/server-only-api/crew';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { initState, State } from '@/store';
import type { Work } from '@/types/Work';

const Crew = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { show = '' } = await searchParams;
    const workId = isArray(show) ? show[0] : show;

    const initialState: State = initState();

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
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initialState} />
            <div>Crew</div>
        </PageStoreProvider>
    );
};

export default Crew;
