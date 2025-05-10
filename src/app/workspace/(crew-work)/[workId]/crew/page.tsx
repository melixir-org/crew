import {
    getOpinionsApi,
    getUserApi,
    getWorkForCrewHomePageApi,
} from '@/lib/server-only-api';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import SessionWrapper from '@/provider/SessionWrapper';
import { type Work } from '@/types/Work';
import { initPageState, type PageState } from '@/store/pageStore';
import CrewHome from '@/components/custom/CrewHome';
import { NEW } from '@/lib/constants';
import { Opinion } from '@/types/Opinion';

const Page = async ({ params }: { params: Promise<{ workId: string }> }) => {
    const { workId } = await params;

    const {
        data: { user },
    } = await getUserApi();

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
            const { data: opinions }: { data: Opinion[] | null } =
                await getOpinionsApi({
                    crewId: data.crew.id,
                });

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
                },
                {
                    server: {
                        crews: {
                            [data.crew.id]: {
                                opinions: opinions ?? [],
                            },
                        },
                    },
                }
            );
        }
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initialState} />
            <SessionWrapper />
            <CrewHome />
        </PageStoreProvider>
    );
};

export default Page;
