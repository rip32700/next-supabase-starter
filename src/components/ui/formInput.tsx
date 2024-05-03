import { Control } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Input } from './input'

export interface FormInputProps {
    label: string
    name: string
    control: Control<any, any>
    placeholder?: string
    description?: string
    type?: string
    disabled?: boolean
}

export function FormInput({ label, name, placeholder, description, type, control, disabled = false }: FormInputProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} type={type} disabled={disabled} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
