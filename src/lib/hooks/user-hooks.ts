import { useEffect, useState } from 'react'
import { createClient } from '../supabase/client'

interface UserProfile {
    id: string
    email: string
    first_name: string
    last_name: string
    img_url: string
}

export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null)

    useEffect(() => {
        const supabase = createClient()

        const getProfile = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()

            const { data } = await supabase.from('profiles').select().eq('id', session?.user?.id)

            setProfile(data?.[0])
        }

        getProfile()
    }, [])

    return profile
}
