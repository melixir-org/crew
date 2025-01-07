import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';

const Settings = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore
                ssrState={{ crews: {}, works: {} }}
            />
            <div>Settings</div>
        </PageStoreProvider>
    );
};

export default Settings;
