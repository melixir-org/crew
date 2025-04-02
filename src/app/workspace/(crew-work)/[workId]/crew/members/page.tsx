import MembersList from '@/components/custom/CrewHome/Members';
import { NEW } from '@/lib/constants';
import {
    getValidatedUserApi,
    getWorkForMembersPageApi,
} from '@/lib/server-only-api';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import SessionWrapper from '@/provider/SessionWrapper';
import { initPageState, PageState } from '@/store/pageStore';
import { Work } from '@/types/Work';

const Members = async ({ params }: { params: Promise<{ workId: string }> }) => {
    const { workId } = await params;

    const {
        data: { user },
    } = await getValidatedUserApi();

    let initialState: PageState = initPageState({
        server: { user },
    });

    if (workId !== NEW) {
        const { data }: { data: Work | null } = await getWorkForMembersPageApi({
            workId,
        });

        if (data && data.crew) {
            initialState = initPageState(initialState, {
                server: {
                    works: {
                        [data.id]: data,
                    },
                    crews: { [data.crew.id]: data.crew },
                },
            });
        }
    }

    return (
        <PageStoreProvider initialState={initialState}>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initialState} />
            <SessionWrapper />
            <MembersList />
        </PageStoreProvider>
    );
};

export default Members;
