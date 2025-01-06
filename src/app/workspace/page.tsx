import Workspace from '@/components/custom/Workspace';
import { getCrews } from '@/lib/server-only-api/crew';
import { getWorks } from '@/lib/server-only-api/work';
import { PageStoreProvider } from '@/provider/PageStore';
import { State } from '@/store';
import { Crew } from '@/types/Crew';
import { CrewsMap } from '@/types/CrewMap';
import { Work } from '@/types/Work';
import { WorksMap } from '@/types/WorksMap';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
    const { page_index, page_size, type } = await searchParams;

    const initialState: State = {
        crews: {},
        works: {},
    };

    if (type === 'crew') {
        const { data }: { data: Crew[] | null } = await getCrews(
            Number(page_index),
            Number(page_size)
        );

        const crewsMap: CrewsMap = {};
        data?.forEach(crew => {
            crewsMap[crew.id] = crew;
        });
        initialState.crews = crewsMap;
    }
    if (type === 'work') {
        const { data }: { data: Work[] | null } = await getWorks(
            Number(page_index),
            Number(page_size)
        );

        const worksMap: WorksMap = {};
        data?.forEach(work => {
            worksMap[work.id] = work;
        });
        initialState.works = worksMap;
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <Workspace />
        </PageStoreProvider>
    );
};

export default Page;
