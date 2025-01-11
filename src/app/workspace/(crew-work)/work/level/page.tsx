import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { initPageState } from '@/store/pageStore';

const Level = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore ssrState={initPageState()} />
            <div>Level</div>
        </PageStoreProvider>
    );
};

export default Level;
