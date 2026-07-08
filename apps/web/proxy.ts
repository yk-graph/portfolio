import { NextResponse, type NextRequest } from 'next/server'

import { locales, defaultLocale, hasLocale } from '@/lib/i18n/config'

const LOCALE_COOKIE = 'NEXT_LOCALE'

function resolveLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookie && hasLocale(cookie)) return cookie

  const header = request.headers.get('accept-language') ?? ''
  const preferred = header.split(',').map((part) => part.split(';')[0].trim().split('-')[0])
  return preferred.find(hasLocale) ?? defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocalePrefix = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  if (hasLocalePrefix) return

  const locale = resolveLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
