import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import SessionWrapper from '@/provider/SessionWrapper';

const Settings = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={{}} />
            <SessionWrapper syncSessionIntoCrewWorkLayoutStore />
            <div>Settings</div>
        </PageStoreProvider>
    );
};

export default Settings;
