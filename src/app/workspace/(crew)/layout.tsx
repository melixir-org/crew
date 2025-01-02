import CrewWorkLayout from '@/components/custom/CrewWorkLayout/CrewWorkLayout';
import { CrewStoreProvider } from '@/provider/CrewStore';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <CrewStoreProvider>
            <CrewWorkLayout>{children}</CrewWorkLayout>
        </CrewStoreProvider>
    );
};

export default Layout;
