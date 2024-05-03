import LoginButton from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'

export default function Home() {
    return (
        <main className="flex h-full flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="space-y-6 text-center">
                <h1 className="text-6xl font-semibold text-white drop-shadow-md">🔐 Auth</h1>
                <p className="text-white text-large">Everything you need to get started</p>
            </div>
            <div className="mt-10">
                <LoginButton>
                    <Button variant="secondary" size="lg">
                        Sign In
                    </Button>
                </LoginButton>
            </div>
        </main>
    )
}
