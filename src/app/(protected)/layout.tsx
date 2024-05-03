import { getCurrentUserProfile } from '@/actions/user-actions'
import AuthProvider from '@/components/contexts/auth-context'
import { Navbar } from '@/components/navbar'

const ProtectedPagesLayout = async ({ children }: { children: React.ReactNode }) => {
    const userProfile = await getCurrentUserProfile()

    return (
        <AuthProvider value={{ userProfile }}>
            <Navbar />
            <main className="mt-10">{children}</main>
        </AuthProvider>
    )
}

export default ProtectedPagesLayout
