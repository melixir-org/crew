import { isArray } from 'lodash-es';
import { getWorkForCrewHomepage } from '@/lib/server-only-api/crew';
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

    let initialState: PageState | undefined = undefined;

    const { data }: { data: Work | null } = await getWorkForCrewHomepage({
        workId,
    });

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
            <CrewHome />
        </PageStoreProvider>
    );
};

export default Crew;
