import { useState, ChangeEvent, FormEvent } from "react"
import { AuthError, AuthErrorCodes } from "firebase/auth"
import { useDispatch } from "react-redux"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import { SignUpContainer } from "./sign-up-form.styles"
import { signUpStart } from "../../store/user/user.action"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () =>{
    const dispatch = useDispatch()
    const [formField, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formField


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        if(password !== confirmPassword){
            alert("Passwords do not match!!!")
            return
        }
        
        try{
            dispatch(signUpStart(email, password, displayName))
            resetFormFields()

        }catch(ex){
            console.log(ex)
            if((ex as AuthError).code === AuthErrorCodes.EMAIL_EXISTS){
                alert('Cannot create user; email already in use')
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target
        setFormFields({...formField, [name]: value})
    }
    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text'required name='displayName' onChange={handleChange} value={displayName} ></FormInput>                
                <FormInput label='Email' type='email'required name='email' onChange={handleChange} value={email} ></FormInput>                
                <FormInput label='Password' type='password'required name='password' onChange={handleChange} value={password} ></FormInput>                
                <FormInput label='Confirm Password' type='password'required name='confirmPassword' onChange={handleChange} value={confirmPassword} ></FormInput>                

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm