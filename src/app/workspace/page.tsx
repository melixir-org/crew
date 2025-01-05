import Workspace from '@/components/custom/Workspace';
import { getCrews } from '@/lib/server-only-api/crew';
import { getWorks } from '@/lib/server-only-api/work';
import { PageStoreProvider } from '@/provider/PageStore';
import { Crew } from '@/types/Crew';
import { CrewsMap } from '@/types/CrewMap';
import { Work } from '@/types/Work';
import { WorksMap } from '@/types/WorksMap';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
    const {page_index, page_size, type} = await searchParams;

    const response : {
        type: string;
        data: CrewsMap | WorksMap;
    } = {
        type: '',
        data: {},
    };

    if(type === 'crew') {
        const crewResponse = await getCrews(Number(page_index), Number(page_size));
        response.type = type;
        const crewsMap: CrewsMap = {};
        (crewResponse.data as Crew[]).forEach((crew) => {
            crewsMap[crew.id] = crew; 
        });
        response.data = crewsMap;
    } else if(type === 'work') {
        const workResponse = await getWorks(Number(page_index), Number(page_size));
        response.type = type;
        const worksMap: WorksMap = {};
        (workResponse.data as Work[]).forEach((work) => {
            worksMap[work.id] = work; 
        });
        response.data = worksMap;
    }

    return (
        <PageStoreProvider response={response}>
            <Workspace />
        </PageStoreProvider>
    );
};

export default Page;
