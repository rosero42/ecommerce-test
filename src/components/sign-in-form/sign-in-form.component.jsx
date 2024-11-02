import {  useState } from "react"
import FormInput from "../form-input/form-input.component"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"
import './sign-in-form.styles.scss'
import { 
    signInWithGooglePopup, 
    signInAndCheckEmailAndPassword
} from "../../util/firebase/firebase.utils" 
const SignInForm = () =>{

    const defaultFormFields = {
        email: '',
        password: '',
    }
    const [formField, setFormFields] = useState(defaultFormFields)
    const {  email, password } = formField


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleChange = (event) =>{
        const {name, value} = event.target
        setFormFields({...formField, [name]: value})
    }

    const signInWithGoogle = async () =>{
        await signInWithGooglePopup()
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            await signInAndCheckEmailAndPassword(email,password)
        }catch(error){        
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Password is incorrect')
                    break
                case 'auth/user-not-found':
                    alert('User not found')
                    break
            }
        }

        resetFormFields()
    }
    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email'required name='email' onChange={handleChange} value={email} ></FormInput>                
                <FormInput label='Password' type='password'required name='password' onChange={handleChange} value={password} ></FormInput> 
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>

            </form>

        </div>
    )
}

export default SignInForm