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
            className="w-full"
        >
            <TabsList className="bg-zinc-900 border border-zinc-800">
                {routes.map(route => (
                    <TabsTrigger
                        key={route.name}
                        value={route.pathname}
                        className="data-[state=active]:bg-zinc-800"
                    >
                        {route.name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};

export default RouteTabs;
