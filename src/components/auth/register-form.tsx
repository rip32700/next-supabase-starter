'use client'

import { register } from '@/actions/auth-actions'
import { sendErrorToast, sendSuccessToast } from '@/lib/utils'
import { RegisterFormSchema } from '@/schemas/auth/register-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { FormInput } from '../ui/formInput'
import { CardWrapper } from './card-wrapper'

interface RegisterFormProps {}

export const RegisterForm = ({}: RegisterFormProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    })

    const handleSubmit = (values: z.infer<typeof RegisterFormSchema>) => {
        startTransition(() => {
            register(values).then((res) => {
                if (res?.error) {
                    sendErrorToast('Registration failed', res.error)
                } else {
                    sendSuccessToast('Registration successful!', 'Please check your mailbox for a verification email.')
                    router.push('/auth/login')
                }
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormInput
                        label="First Name"
                        name="firstName"
                        placeholder="John"
                        control={form.control}
                        disabled={isPending}
                    />
                    <FormInput
                        label="Last Name"
                        name="lastName"
                        placeholder="Doe"
                        control={form.control}
                        disabled={isPending}
                    />
                    <FormInput
                        label="Email"
                        name="email"
                        placeholder="john.doe@example.com"
                        type="email"
                        control={form.control}
                        disabled={isPending}
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        placeholder="********"
                        type="password"
                        control={form.control}
                        disabled={isPending}
                    />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
