'use client';

import { usePathname } from 'next/navigation';
import CrewWorkLayout from '@/components/custom/CrewWorkLayout/CrewWorkLayout';
import NoLayout from '@/components/custom/NoLayout';
import { WORKSPACE_ROUTE } from '../routes';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const WorkspaceLayout =
        pathname === WORKSPACE_ROUTE.pathname ? NoLayout : CrewWorkLayout;

    return <WorkspaceLayout>{children}</WorkspaceLayout>;
};

export default Layout;
