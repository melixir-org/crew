import Workspace from '@/components/custom/Workspace/Workspace';
import { PageStoreProvider } from '@/provider/PageStore';
import { getCrews } from '@/lib/server-only-api/crew';
import { getWorks } from '@/lib/server-only-api/work';
import { initState, State } from '@/store';
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

    const initialState: State = initState();

    if (type === CREW) {
        const { data }: { data: Crew[] | null } = await getCrews(
            Number(page_index),
            Number(page_size)
        );

        const crews: CrewsMap = {};
        data?.forEach(crew => {
            crews[crew.id] = crew;
        });
        initialState.crews = crews;
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
        initialState.works = works;
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <Workspace />
        </PageStoreProvider>
    );
};

export default Page;
