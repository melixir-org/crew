import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { initState } from '@/store';

const Settings = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore mergeState={initState()} />
            <div>Settings</div>
        </PageStoreProvider>
    );
};

export default Settings;
