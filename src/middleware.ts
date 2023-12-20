import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Middleware = (request: NextRequest) => NextResponse;


const authenticated: Middleware = (request) => {
  const authSession = request.cookies.get('auth')?.value;

  if (!authSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export default function middleware(request: NextRequest) {
 
  if (['/login', '/register'].includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  
  if ([  '/pokemons', '/pokemons/client'].includes(request.nextUrl.pathname)) {
    return authenticated(request);
  }

  return NextResponse.next();
};
