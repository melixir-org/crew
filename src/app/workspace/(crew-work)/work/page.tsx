import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';

const Work = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore
                ssrState={{ crews: {}, works: {} }}
            />
            <div>Work</div>
        </PageStoreProvider>
    );
};

export default Work;
