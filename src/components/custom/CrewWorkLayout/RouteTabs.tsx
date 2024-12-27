import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Route } from '@/types/Route';

type TabValue = Route['pathname'];

const RouteTabs = ({ routes }: { routes: Route[] }) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleTabChange = (tab: TabValue) => {
        router.push(`${tab}?${searchParams.toString()}`);
    };

    return (
        <Tabs
            value={pathname}
            onValueChange={value => handleTabChange(value as TabValue)}
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
