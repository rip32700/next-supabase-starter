'use client'

import { UserProfile } from '@/types/userProfile'
import { createContext, useContext } from 'react'

type AuthContextType = {
    userProfile: UserProfile | null
}

export const AuthContext = createContext<AuthContextType>({ userProfile: null })

// provider to wrap the app with the auth context
export default function AuthProvider({ children, value }: { children: React.ReactNode; value: AuthContextType }) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// convenience hook to use the auth context
export const useAuthContext = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('authContext has to be used within <AuthContext.Provider>')
    }

    return authContext
}
