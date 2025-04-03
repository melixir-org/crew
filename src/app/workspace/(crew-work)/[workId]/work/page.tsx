import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import WorkHome from '@/components/custom/WorkHome';
import { PageStoreProvider } from '@/provider/PageStore';
import {
    getValidatedUserApi,
    getWorkForWorkHomePageApi,
    getWorkMetaDataApi,
    getWorkWhileCreateWorkForWorkHomePageApi,
} from '@/lib/server-only-api';
import { initPageState, PageState } from '@/store/pageStore';
import type { Work } from '@/types/Work';
import SessionWrapper from '@/provider/SessionWrapper';

const Page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ workId: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
    const { workId } = await params;
    const { create_work } = await searchParams;

    const {
        data: { user },
    } = await getValidatedUserApi();

    let initialState: PageState = initPageState({
        server: { user },
    });

    if (create_work !== workId) {
        const { data }: { data: Work | null } = await getWorkForWorkHomePageApi(
            {
                workId,
            }
        );

        if (data && data.crew) {
            initialState = initPageState(initialState, {
                server: {
                    works: { [data.id]: data },
                    crews: { [data.crew.id]: data.crew },
                },
            });

            if (data.parent_id) {
                const { data: parentWorkData }: { data: Work | null } =
                    await getWorkMetaDataApi({
                        workId: data.parent_id,
                    });

                if (parentWorkData) {
                    initialState = initPageState(initialState, {
                        server: {
                            works: { [parentWorkData.id]: parentWorkData },
                        },
                    });
                }
            }
        }
    } else {
        const { data }: { data: Work | null } =
            await getWorkWhileCreateWorkForWorkHomePageApi({
                workId,
            });

        if (data && data.crew) {
            initialState = initPageState(initialState, {
                server: {
                    works: { [data.id]: data },
                    crews: { [data.crew.id]: data.crew },
                },
            });
        }
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initialState} />
            <SessionWrapper />
            <WorkHome />
        </PageStoreProvider>
    );
};

export default Page;
