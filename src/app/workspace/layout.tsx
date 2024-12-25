// TODO: get this use client removed or check if it is needed
'use client';

import { usePathname } from 'next/navigation';
import CrewWorkLayout from '@/components/custom/CrewWorkLayout/CrewWorkLayout';
import { CREW_ROUTE_GROUP, WORK_ROUTE_GROUP } from '@/types/RouteGroup';
import NoLayout from '@/components/custom/NoLayout';
import { getRouteGroup } from '@/lib/utils';

interface LayoutProps {
    children: React.ReactNode;
}

const ROUTE_GROUP_TO_MAIN_LAYOUT_MAPPING = {
    [CREW_ROUTE_GROUP]: CrewWorkLayout,
    [WORK_ROUTE_GROUP]: CrewWorkLayout,
    '': NoLayout,
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const MainLayout =
        ROUTE_GROUP_TO_MAIN_LAYOUT_MAPPING[getRouteGroup(pathname) ?? ''];

    return <MainLayout>{children}</MainLayout>;
};

export default Layout;
