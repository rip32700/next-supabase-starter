'use client'

import { logout } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { PowerIcon } from 'lucide-react'
import Link from 'next/link'
import { useAuthContext } from './contexts/auth-context'

export const Navbar = () => {
    const userProfile = useAuthContext().userProfile

    const handleLogout = () => logout()

    return (
        <header className="bg-blue-600 text-gray-50 px-4 md:px-6 h-16 flex items-center justify-between ">
            <Link className="flex items-center gap-2" href="#">
                <span className="text-2xl">⚙️</span>
                <span className="font-semibold text-lg ml-2">ACME</span>
            </Link>
            <div className="flex items-center gap-4">
                {userProfile && <span className="text-sm font-medium">Hello {userProfile?.first_name}</span>}
                <Button className="rounded-full" size="icon" variant="ghost" onClick={handleLogout}>
                    <PowerIcon className="h-5 w-5" />
                </Button>
            </div>
        </header>
    )
}
