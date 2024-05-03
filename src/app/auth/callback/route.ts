import { createClient } from '@/lib/supabase/server'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { NextResponse } from 'next/server'

/**
 * This will be called by oauth2 providers after the user has authenticated
 */
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
        const supabase = createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            return NextResponse.redirect(`${origin}${DEFAULT_LOGIN_REDIRECT}`)
        }
    }

    // return the user to an error page
    return NextResponse.redirect(`${origin}/auth/auth-error`)
}
