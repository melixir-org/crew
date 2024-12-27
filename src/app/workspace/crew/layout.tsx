'use client';

import { CREW_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import RouteTabs from '@/components/custom/CrewWorkLayout/RouteTabs';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    return (
        <>
            <div className="p-6">
                <h1
                    className="text-2xl font-bold tracking-tight text-white cursor-pointer"
                    onClick={handleRouteChange}
                >
                    Title of the crew goes here [CLICK TO GO BACK]
                </h1>
            </div>
            <div className="px-6">
                <RouteTabs routes={CREW_ROUTE_GROUP_ROUTES} />
                <div className="mt-6">{children}</div>
            </div>
        </>
    );
};

export default Layout;
