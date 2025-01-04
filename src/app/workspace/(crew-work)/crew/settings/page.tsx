import CrewPage from '@/components/custom/CrewWorkLayout/CrewPage';
import { PageStoreProvider } from '@/provider/PageStore';

const Settings = () => {
    return (
        <PageStoreProvider>
            <CrewPage>
                <div>Settings</div>
            </CrewPage>
        </PageStoreProvider>
    );
};

export default Settings;
