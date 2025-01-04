import WorkPage from '@/components/custom/CrewWorkLayout/WorkPage';
import { PageStoreProvider } from '@/provider/PageStore';

const Level = () => {
    return (
        <PageStoreProvider>
            <WorkPage>
                <div>Level</div>
            </WorkPage>
        </PageStoreProvider>
    );
};

export default Level;
