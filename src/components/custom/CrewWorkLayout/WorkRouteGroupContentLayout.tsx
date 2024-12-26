import { WORK_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import RouteTabs from './RouteTabs';
import { useRouter, useSearchParams } from 'next/navigation';

interface WorkRouteGroupContentLayoutProps {
    children: React.ReactNode;
}

const WorkRouteGroupContentLayout: React.FC<
    WorkRouteGroupContentLayoutProps
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
                    Title of the work goes here
                </h1>
            </div>
            <div className="px-6">
                <RouteTabs tabs={WORK_ROUTE_GROUP_ROUTES} />
                <div className="mt-6">{children}</div>
            </div>
        </div>
    );
};

export default WorkRouteGroupContentLayout;
