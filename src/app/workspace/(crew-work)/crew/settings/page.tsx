import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { initPageState } from '@/store/pageStore';

const Settings = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initPageState()} />
            <div>Settings</div>
        </PageStoreProvider>
    );
};

export default Settings;
