'use server'

import { createClient } from '@/lib/supabase/server'

export const getCurrentUserProfile = async () => {
    const supabase = createClient()

    // get current user ID
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'User not found' }
    }

    return getUserProfile(user.id)
}

export const getUserProfile = async (id: string) => {
    const supabase = createClient()

    // get profile data from user id
    const { data, error } = await supabase.from('profiles').select().eq('id', id)

    if (error) {
        return { error: 'Error fetching profile data' }
    }

    return data?.[0]
}
