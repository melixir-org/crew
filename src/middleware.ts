import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AUTH_ROUTE, WORKSPACE_ROUTE } from './app/routes';

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith(WORKSPACE_ROUTE.pathname)) {
        const supabaseServerClient = await createSupabaseServerClient();

        const {
            data: { session },
        } = await supabaseServerClient.auth.getSession();

        const isUnauthenticated = session === null;

        // Redirect to auth page if not authenticated
        if (isUnauthenticated) {
            const currentUrl = new URL(request.url);
            const redirectTo = new URL(AUTH_ROUTE.pathname, currentUrl.origin);

            redirectTo.searchParams.set(
                'next',
                currentUrl.pathname + currentUrl.search
            );

            return NextResponse.redirect(redirectTo);
        }
    }

    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
