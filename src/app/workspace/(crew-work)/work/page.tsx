import WorkPage from '@/components/custom/CrewWorkLayout/WorkPage';
import { PageStoreProvider } from '@/provider/PageStore';

const Work = () => {
    return (
        <PageStoreProvider>
            <WorkPage>
                <div>Work</div>
            </WorkPage>
        </PageStoreProvider>
    );
};

export default Work;
