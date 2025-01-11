import { isArray } from 'lodash-es';
import { getCrewForCrewHomepage } from '@/lib/server-only-api/crew';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { type Work } from '@/types/Work';
import { initPageState, type PageState } from '@/store/pageStore';
import CrewHome from '@/components/custom/CrewHome/CrewHome';

const Crew = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { show = '' } = await searchParams;
    const workId = isArray(show) ? show[0] : show;

    const initialState: PageState = initPageState();

    const { data }: { data: Work | null } = await getCrewForCrewHomepage({
        workId,
    });

    if (data) {
        initialState.server.works[data.id] = data;
    }

    if (data?.crew) {
        initialState.server.crews[data.crew.id] = data.crew;
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initialState} />
            <CrewHome />
        </PageStoreProvider>
    );
};

export default Crew;
