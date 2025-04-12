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
import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

const NavBar = async () => {
    const {
        data: { user },
    } = await getUserApi();

    return (
        <nav className="flex justify-between items-center px-8 py-5 bg-[#101010] sticky top-0 z-50 shadow-md">
            <NavigationMenu>
                <NavigationMenuList className="gap-6">
                    <NavigationMenuItem>
                        <Link href={HOME_ROUTE.pathname}>
                            <span className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                Melixir
                            </span>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={WORKSPACE_ROUTE.pathname}>
                            <span className="text-xl opacity-65 hover:opacity-90 transition-opacity">
                                Workspace
                            </span>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList className="gap-2">
                    <NavigationMenuItem>
                        <Link
                            href={'https://github.com/melixir-org/crew/issues'}
                            target="_blank"
                        >
                            <GitHubLogoIcon className="h-8 w-8" />
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            href={'https://discord.gg/4H69nEvHmm'}
                            target="_blank"
                        >
                            <DiscordLogoIcon className="h-8 w-8" />
                        </Link>
                    </NavigationMenuItem>
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
                                    'h-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-all hover:text-white hover:scale-105'
                                )}
                            >
                                <div>Login or Sign Up</div>
                            </Link>
                        )}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    );
};

export default NavBar;
