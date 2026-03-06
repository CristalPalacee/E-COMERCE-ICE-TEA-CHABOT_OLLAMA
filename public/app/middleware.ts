import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

  // Jika mencoba akses /admin tapi tidak ada cookie session, tendang ke login
  if (isAdminPage && !isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Jika sudah login tapi malah mau ke halaman login lagi, arahkan ke dashboard admin
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

// Atur agar middleware hanya berjalan di rute admin saja
export const config = {
  matcher: '/admin/:path*',
}