import { CardWrapper } from './card-wrapper'

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops something went wrong!"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        />
    )
}
