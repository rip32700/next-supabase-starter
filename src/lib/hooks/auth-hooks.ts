import { UserProfile } from '@/types/userProfile'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { createClient } from '../supabase/client'

export const useUserData = () => {
    const [userData, setUserData] = useState<UserProfile | null>(null)

    useEffect(() => {
        const supabase = createClient()

        const getUserData = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            const userData = session?.user.user_metadata as UserProfile

            setUserData(userData)
        }

        getUserData()
    }, [])

    return userData
}

export default function useSession() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        const supabase = createClient()

        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()

            setSession(session)
        }

        getSession()
    }, [])

    return session
}
