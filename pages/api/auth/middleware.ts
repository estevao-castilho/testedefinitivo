// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redireciona a raiz para /onboard
  if (pathname === '/') {
    const onboardUrl = new URL('/onboard', request.url);
    return NextResponse.redirect(onboardUrl);
  }

  // Para todas outras rotas, apenas continua
  return NextResponse.next();
}

// Configuração do middleware (opcional)
export const config = {
  matcher: ['/', '/onboard'], // Aplica apenas a estas rotas
};