import CrewWorkLayout from '@/components/custom/CrewWorkLayout';
import { CrewWorkLayoutStoreProvider } from '@/provider/CrewWorkLayoutStore';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <CrewWorkLayoutStoreProvider>
            <CrewWorkLayout>{children}</CrewWorkLayout>
        </CrewWorkLayoutStoreProvider>
    );
};

export default Layout;
