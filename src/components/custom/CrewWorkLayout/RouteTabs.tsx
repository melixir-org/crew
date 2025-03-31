import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Route } from '@/types/Route';
import { extractPathnameAfterWorkId, extractWorkId } from '@/lib/utils';
import { WORKSPACE_ROUTE } from '@/app/routes';

type TabValue = Route['pathname'];

const RouteTabs = ({ routes }: { routes: Route[] }) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const workId: string = extractWorkId(pathname);

    const handleTabChange = (v: TabValue) => {
        router.push(
            `${
                WORKSPACE_ROUTE.pathname
            }/${workId}${v}?${searchParams.toString()}`
        );
    };

    return (
        <Tabs
            value={extractPathnameAfterWorkId(pathname)}
            onValueChange={value => handleTabChange(value)}
            className="w-60"
        >
            <TabsList className="grid grid-cols-2">
                {routes.map(route => (
                    <TabsTrigger
                        key={route.name}
                        value={route.pathname}
                        className="data-[state=active]:bg-black data-[state=active]:text-white"
                    >
                        {route.name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};

export default RouteTabs;
