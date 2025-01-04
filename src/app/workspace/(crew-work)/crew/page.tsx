import CrewPage from '@/components/custom/CrewWorkLayout/CrewPage';
import { PageStoreProvider } from '@/provider/PageStore';

const Crew = () => {
    return (
        <PageStoreProvider>
            <CrewPage>
                <div>Crew</div>
            </CrewPage>
        </PageStoreProvider>
    );
};

export default Crew;
