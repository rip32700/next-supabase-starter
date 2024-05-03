import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const sendSuccessToast = (title: string, message: string) => {
    toast.success(title, {
        description: message,
        duration: 5000,
        position: 'top-right',
    })
}

export const sendErrorToast = (title: string, message: string) => {
    toast.error(title, {
        description: message,
        duration: 5000,
        position: 'top-right',
    })
}
