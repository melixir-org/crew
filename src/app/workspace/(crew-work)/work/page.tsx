import { isArray } from 'lodash-es';
import { getWorkWithCrewMetaData } from '@/lib/server-only-api/crew';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { initState, State } from '@/store';
import type { Work } from '@/types/Work';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Work: React.FC<PageProps> = async ({ searchParams }) => {
    const { show = '' } = await searchParams;
    const workId = isArray(show) ? show[0] : show;

    const initialState: State = initState();

    const { data }: { data: Work | null } = await getWorkWithCrewMetaData({
        workId,
    });

    if (data) {
        initialState.works[data.id] = data;
    }

    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initialState} />
            <div>Work</div>
        </PageStoreProvider>
    );
};

export default Work;
