import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { LOGIN_ROUTE, WORKSPACE_ROUTE } from './app/routes';

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith(WORKSPACE_ROUTE.pathname)) {
        const supabaseServerClient = await createSupabaseServerClient();

        const {
            data: { session },
        } = await supabaseServerClient.auth.getSession();

        const isUnauthenticated = session === null;

        // Redirect to login page if not authenticated
        if (isUnauthenticated) {
            return NextResponse.redirect(
                new URL(LOGIN_ROUTE.pathname, request.url)
            );
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
