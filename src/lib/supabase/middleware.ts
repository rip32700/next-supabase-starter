import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from '@/routes'
import { UserResponse } from '@supabase/auth-js'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createSupabaseClient(request, response)

    // refreshing the auth token
    const user = await supabase.auth.getUser()
    // check if we need to redirect due to protected routes
    const redirectResponse = checkProtectedRoutes(request, user)

    return redirectResponse ?? response
}

const checkProtectedRoutes = (request: NextRequest, user: UserResponse) => {
    const { nextUrl } = request
    const isLoggedIn = !user.error
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/auth/login', nextUrl))
    }

    return null
}

const createSupabaseClient = (request: NextRequest, response: NextResponse) =>
    createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            get(name: string) {
                return request.cookies.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
                request.cookies.set({
                    name,
                    value,
                    ...options,
                })
                response = NextResponse.next({
                    request: {
                        headers: request.headers,
                    },
                })
                response.cookies.set({
                    name,
                    value,
                    ...options,
                })
            },
            remove(name: string, options: CookieOptions) {
                request.cookies.set({
                    name,
                    value: '',
                    ...options,
                })
                response = NextResponse.next({
                    request: {
                        headers: request.headers,
                    },
                })
                response.cookies.set({
                    name,
                    value: '',
                    ...options,
                })
            },
        },
    })
