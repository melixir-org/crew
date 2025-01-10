import MergeSsrStateIntoCrewWorkLayoutStore from '@/provider/MergeSsrStateIntoCrewWorkLayoutStore';
import { PageStoreProvider } from '@/provider/PageStore';
import { initState } from '@/store';

const Level = () => {
    return (
        <PageStoreProvider>
            <MergeSsrStateIntoCrewWorkLayoutStore mergeState={initState()} />
            <div>Level</div>
        </PageStoreProvider>
    );
};

export default Level;
