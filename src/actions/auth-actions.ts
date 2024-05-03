'use server'

import { BASE_URL } from '@/lib/consts'
import { createClient } from '@/lib/supabase/server'
import { LoginFormSchema } from '@/schemas/auth/login-schema'
import { RegisterFormSchema } from '@/schemas/auth/register-schema'
import { SocialProviderEnum } from '@/types/socialProviderEnum'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
    const supabase = createClient()

    const parsedData = LoginFormSchema.safeParse(values)
    if (!parsedData.success) return { error: 'Invalid fields!' }

    const { error } = await supabase.auth.signInWithPassword(parsedData.data)
    if (error) return { error: error.message }

    revalidatePath('/', 'layout')
    redirect('/account')
}

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
    const supabase = createClient()

    const parsedData = RegisterFormSchema.safeParse(values)
    if (!parsedData.success) return { error: 'Invalid fields!' }

    const { email, password, ...profileData } = parsedData.data
    const registerOptions = {
        email,
        password,
        options: {
            data: profileData,
            emailRedirectTo: `${BASE_URL}/auth/confirm`,
        },
    }

    const { error } = await supabase.auth.signUp(registerOptions)
    if (error) return { error: error.message }

    revalidatePath('/', 'layout')
    redirect('/account')
}

export const logout = async () => {
    const supabase = createClient()

    // Check if a user's logged in
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user) {
        await supabase.auth.signOut()
    }

    revalidatePath('/', 'layout')
    redirect('/auth/login')
}

export const signUpWithProvider = async (provider: SocialProviderEnum) => {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${BASE_URL}/auth/callback`,
        },
    })
    if (error) return { error: error.message }

    redirect(data.url)
}
