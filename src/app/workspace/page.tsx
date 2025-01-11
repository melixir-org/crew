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
    const { page_index, page_size, type } = await searchParams;

    const initialState: PageState = initPageState();

    if (type === CREW) {
        const { data }: { data: Crew[] | null } = await getCrews(
            Number(page_index),
            Number(page_size)
        );

        const crews: CrewsMap = {};
        data?.forEach(crew => {
            crews[crew.id] = crew;
        });
        initialState.server.crews = crews;
    }
    if (type === WORK) {
        const { data }: { data: Work[] | null } = await getWorks(
            Number(page_index),
            Number(page_size)
        );

        const works: WorksMap = {};
        data?.forEach(work => {
            works[work.id] = work;
        });
        initialState.server.works = works;
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <Workspace />
        </PageStoreProvider>
    );
};

export default Page;
