import CrewWorkLayout from '@/components/custom/CrewWorkLayout/CrewWorkLayout';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <CrewWorkLayout>{children}</CrewWorkLayout>;
};

export default Layout;
