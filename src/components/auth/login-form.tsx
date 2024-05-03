'use client'

import { login } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/ui/formInput'
import { sendErrorToast } from '@/lib/utils'
import { LoginFormSchema } from '@/schemas/auth/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CardWrapper } from './card-wrapper'

interface LoginFormProps {}

export const LoginForm = ({}: LoginFormProps) => {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const handleSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
        startTransition(() => {
            login(values).then((res) => {
                if (res?.error) {
                    sendErrorToast('Login failed', res.error)
                }
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
