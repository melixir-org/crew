import { isArray } from 'lodash-es';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { initState, State } from '@/store';
import type { Work } from '@/types/Work';
import { getWorkDescAndContributors } from '@/lib/server-only-api/work';
import WorkDesc from '@/components/custom/WorkDesc';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Work: React.FC<PageProps> = async ({ searchParams }) => {
    const { show = '' } = await searchParams;
    const workId = isArray(show) ? show[0] : show;

    const initialState: State = initState();

    const { data }: { data: Work | null } = await getWorkDescAndContributors(
        workId
    );

    if (data) {
        initialState.works[data.id] = data;
    }
    return (
        <PageStoreProvider initialState={initialState}>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initialState} />
            <WorkDesc />
        </PageStoreProvider>
    );
};

export default Work;
