interface HeaderProops {
    label: string
}

export const Header = ({ label }: HeaderProops) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className="text-3xl font-semibold"> ACME</h1>
            <p className="text-muted-foreground text-small">{label}</p>
        </div>
    )
}
