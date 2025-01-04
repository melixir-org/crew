import CrewPage from '@/components/custom/CrewWorkLayout/CrewPage';
import { getWorkWithCrewMetaData } from '@/lib/server-only-api/crew';

import { PageStoreProvider } from '@/provider/PageStore';
import { Work } from '@/types/Work';

const Crew = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const show = (await searchParams).show ?? '';
    const workId = typeof show === 'object' ? show[0] : show;

    const { data }: { data: Work | null } = await getWorkWithCrewMetaData({
        workId,
    });

    console.log(data);

    return (
        <PageStoreProvider>
            <CrewPage>
                <div>Crew</div>
                <div>crew title: {data?.crew?.root_work?.title}</div>
            </CrewPage>
        </PageStoreProvider>
    );
};

export default Crew;
