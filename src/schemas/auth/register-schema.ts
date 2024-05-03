import { z } from 'zod'

export const RegisterFormSchema = z.object({
    firstName: z.string({
        message: 'First name is required',
    }),
    lastName: z.string({
        message: 'Last name is required',
    }),
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
})
