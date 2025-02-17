import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import SessionWrapper from '@/provider/SessionWrapper';

const Level = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={{}} />
            <SessionWrapper syncSessionIntoCrewWorkLayoutStore />
            <div>Level</div>
        </PageStoreProvider>
    );
};

export default Level;
