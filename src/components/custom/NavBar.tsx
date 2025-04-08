import Link from 'next/link';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { HOME_ROUTE, AUTH_ROUTE, WORKSPACE_ROUTE } from '@/app/routes';
import { cn } from '@/lib/utils';
import { getUserApi } from '@/lib/server-only-api';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const NavBar = async () => {
    const {
        data: { user },
    } = await getUserApi();

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
                        {user ? (
                            <Link href={AUTH_ROUTE.pathname}>
                                <Avatar className="h-8 w-8">
                                    {user.user_metadata.avatar_url ? (
                                        <AvatarImage
                                            src={user.user_metadata.avatar_url}
                                        />
                                    ) : (
                                        <AvatarFallback className="bg-gray-100 text-black">
                                            <span className="text-xs">
                                                {user.user_metadata.name
                                                    .split(' ')
                                                    .map((t: string) =>
                                                        t[0].toUpperCase()
                                                    )
                                                    .join('')
                                                    .slice(0, 2)}
                                            </span>
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                            </Link>
                        ) : (
                            <Link
                                href={AUTH_ROUTE.pathname}
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    'h-8'
                                )}
                            >
                                <div>Login or Sign Up</div>
                            </Link>
                        )}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default NavBar;
