import { Group, FormInputLabel, Input } from "./form-input.styles"
import { FC, InputHTMLAttributes } from "react"

export type FormInputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>
const FormInput: FC<FormInputProps> = ({label, ...otherProps}) =>{
    return(
        <Group>
            <Input {...otherProps}/>
            { label && (
                <FormInputLabel shrink={Boolean(
                    otherProps.value && 
                    typeof otherProps.value == 'string' && 
                    otherProps.value.length)}>
                    {label}
                </FormInputLabel>
                )}
        </Group>
    )
}

export default FormInput