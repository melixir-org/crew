import { isArray } from 'lodash-es';
import { getWorkForCrewHomePageApi } from '@/lib/server-only-api';
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
    const { show = '', create_mode } = await searchParams;

    let initialState: PageState | undefined = undefined;

    if (!create_mode) {
        const workId = isArray(show) ? show[0] : show;

        const { data }: { data: Work | null } = await getWorkForCrewHomePageApi(
            {
                workId,
            }
        );

        if (data && data.crew && data.crew.root_work) {
            initialState = initPageState(
                {
                    server: {
                        works: {
                            [data.id]: data,
                        },
                        crews: { [data.crew.id]: data.crew },
                    },
                },
                {
                    server: {
                        works: {
                            [data.crew.root_work.id]: data.crew.root_work,
                        },
                    },
                }
            );
        }
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initialState} />
            <CrewHome />
        </PageStoreProvider>
    );
};

export default Crew;
