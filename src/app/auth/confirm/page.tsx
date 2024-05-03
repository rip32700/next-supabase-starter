import { CardWrapper } from '@/components/auth/card-wrapper'

interface ConfirmPageProps {}

const ConfirmPage = (props: ConfirmPageProps) => {
    return (
        <CardWrapper headerLabel="Email verified!" backButtonLabel="Continue to login" backButtonHref="/auth/login">
            <p className="mt-10 mb-10">
                Thank you for verifying your email address, your registration is now complete and you can log in to
                ACME.
            </p>
        </CardWrapper>
    )
}

export default ConfirmPage
