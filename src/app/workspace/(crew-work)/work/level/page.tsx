import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';

const Level = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore
                ssrState={{ crews: {}, works: {} }}
            />
            <div>Level</div>
        </PageStoreProvider>
    );
};

export default Level;
