import {
    getValidatedUserApi,
    getWorkForCrewHomePageApi,
} from '@/lib/server-only-api';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import SessionWrapper from '@/provider/SessionWrapper';
import { type Work } from '@/types/Work';
import { initPageState, type PageState } from '@/store/pageStore';
import CrewHome from '@/components/custom/CrewHome/CrewHome';
import { NEW } from '@/lib/constants';

const Crew = async ({ params }: { params: Promise<{ workId: string }> }) => {
    const { workId } = await params;

    const {
        data: { user },
    } = await getValidatedUserApi();

    let initialState: PageState = initPageState({
        server: { user },
    });

    if (workId !== NEW) {
        const { data }: { data: Work | null } = await getWorkForCrewHomePageApi(
            {
                workId,
            }
        );

        if (data && data.crew && data.crew.root_work) {
            initialState = initPageState(
                initialState,
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
            <SessionWrapper syncSessionIntoCrewWorkLayoutStore />
            <CrewHome />
        </PageStoreProvider>
    );
};

export default Crew;
