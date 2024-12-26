import { CREW_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import RouteTabs from './RouteTabs';
import { useRouter, useSearchParams } from 'next/navigation';

interface CrewRouteGroupContentLayoutProps {
    children: React.ReactNode;
}

const CrewRouteGroupContentLayout: React.FC<
    CrewRouteGroupContentLayoutProps
> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-6">
                <h1
                    className="text-2xl font-bold tracking-tight text-white cursor-pointer"
                    onClick={handleRouteChange}
                >
                    Title of the crew goes here [CLICK TO GO BACK]
                </h1>
            </div>
            <div className="px-6">
                <RouteTabs tabs={CREW_ROUTE_GROUP_ROUTES} />
                <div className="mt-6">{children}</div>
            </div>
        </div>
    );
};

export default CrewRouteGroupContentLayout;
