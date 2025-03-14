import {  useState, FormEvent, ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { AuthErrorCodes, AuthError } from "firebase/auth"
import FormInput from "../form-input/form-input.component"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles"
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action"

const SignInForm = () =>{
    const dispatch = useDispatch()
    const defaultFormFields = {
        email: '',
        password: '',
    }
    const [formField, setFormFields] = useState(defaultFormFields)
    const {  email, password } = formField


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target
        setFormFields({...formField, [name]: value})
    }

    const signInWithGoogle = async () =>{
        dispatch(googleSignInStart())
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        try{
            dispatch(emailSignInStart(email, password))
        }catch(error){        
            switch((error as AuthError).code){
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('Password is incorrect')
                    break
                case AuthErrorCodes.USER_DELETED:
                    alert('User not found')
                    break
            }
        }

        resetFormFields()
    }
    return(
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email'required name='email' onChange={handleChange} value={email} ></FormInput>                
                <FormInput label='Password' type='password'required name='password' onChange={handleChange} value={password} ></FormInput> 
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>

            </form>

        </SignInContainer>
    )
}

export default SignInForm