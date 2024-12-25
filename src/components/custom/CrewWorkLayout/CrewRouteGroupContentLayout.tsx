import { CREW_ROUTE_GROUP_ROUTES } from '@/app/routes';
import RouteTabs from './RouteTabs';

interface CrewRouteGroupContentLayoutProps {
    children: React.ReactNode;
}

const CrewRouteGroupContentLayout: React.FC<
    CrewRouteGroupContentLayoutProps
> = ({ children }) => {
    return (
        <div className="flex-1 flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                    Title of the crew goes here
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
