'use client'

import { signUpWithProvider } from '@/actions/auth-actions'
import { SocialProviderEnum } from '@/types/socialProviderEnum'
import { FaSlack } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'

export const Social = () => {
    const handleClick = async (provider: SocialProviderEnum) => {
        signUpWithProvider(provider)
    }

    return (
        <div className="flex items-center justify-center w-full gap-x-2">
            <Button
                size="lg"
                onClick={() => handleClick(SocialProviderEnum.GOOGLE)}
                variant="outline"
                className="w-full"
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                size="lg"
                onClick={() => handleClick(SocialProviderEnum.SLACK)}
                variant="outline"
                className="w-full"
            >
                <FaSlack className="h-5 w-5" />
            </Button>
        </div>
    )
}
