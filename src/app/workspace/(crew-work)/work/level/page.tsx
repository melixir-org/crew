import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { initPageState } from '@/store/pageStore';

const Level = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore
                mergeState={initPageState()}
            />
            <div>Level</div>
        </PageStoreProvider>
    );
};

export default Level;
