import {getToken} from 'next-auth/jwt';
import {NextResponse} from 'next/server';

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    // Allow the request if either of the following is true...
    // 1. If its a request for a next-auth session
    // 2. If the token exists
    if(pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect to login page if they don't have a token AND they are requesting a protected route
    if(!token && pathname!== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

}

// Fix for trailing slash issue with Next 12.x middleware
export const config = {
    matcher: '/',
 };