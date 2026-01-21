import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Manejar requests de imágenes de Firebase Storage
  if (request.nextUrl.pathname.startsWith('/_next/image')) {
    const url = request.nextUrl.searchParams.get('url');
    
    if (url && (
      url.includes('firebasestorage.googleapis.com') ||
      url.includes('firebasestorage.app') ||
      url.includes('storage.googleapis.com')
    )) {
      // Agregar headers para mejor caching de imágenes de Firebase
      const response = NextResponse.next();
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/_next/image/:path*',
  ],
};