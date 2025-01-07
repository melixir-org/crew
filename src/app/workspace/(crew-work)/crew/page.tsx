import { getWorkWithCrewMetaData } from '@/lib/server-only-api/crew';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';

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
            <MergeSsrStateIntoCrewWorkLayoutStore
                ssrState={{ crews: {}, works: {} }}
            />
            <div>Crew</div>
        </PageStoreProvider>
    );
};

export default Crew;
