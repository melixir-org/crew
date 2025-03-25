import MembersList from '@/components/custom/CrewHome/Members/MembersList';
import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import SessionWrapper from '@/provider/SessionWrapper';

const Members = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={{}} />
            <SessionWrapper syncSessionIntoCrewWorkLayoutStore />
            <MembersList />
        </PageStoreProvider>
    );
};

export default Members;
