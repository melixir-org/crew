import Link from 'next/link';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { HOME_ROUTE, AUTH_ROUTE, WORKSPACE_ROUTE } from '@/app/routes';
import { cn } from '@/lib/utils';

const NavBar = () => {
    return (
        <div className="flex justify-between px-12 py-2 border-b border-zinc-800 bg-primary-dark-bg backdrop-blur supports-[backdrop-filter]:bg-black/60">
            <NavigationMenu>
                <NavigationMenuList className="gap-3">
                    <NavigationMenuItem>
                        <Link href={HOME_ROUTE.pathname}>
                            <span className="font-bold text-lg">Melixir</span>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={WORKSPACE_ROUTE.pathname}>Workspace</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link
                            href={AUTH_ROUTE.pathname}
                            className={cn(navigationMenuTriggerStyle(), 'h-8')}
                        >
                            <div>Login or Sign Up</div>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default NavBar;
