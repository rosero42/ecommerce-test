import FormInput from "../form-input/form-input.component"
import { useState } from "react"
import Button from "../button.component/button.component"
import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect, 
    signInAndCheckEmailAndPassword
} from "../../util/firebase/firebase.utils" 
import { getRedirectResult } from "firebase/auth"
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

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    const verifyUser = async (email, password) =>{
        const response = await signInAndCheckEmailAndPassword(email,password)
        console.log(response)
    }
    const signIn = () =>{
        verifyUser(email,password)
    }
    return(
        <div>
            {
                //Email

                //Password


                //Sign in Button

                //Sign in with google button
            
            }
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <FormInput label='Email' type='email'required name='email' onChange={handleChange} value={email} ></FormInput>                
            <FormInput label='Password' type='password'required name='password' onChange={handleChange} value={password} ></FormInput> 
            <Button onClick={signIn}>Sign In</Button>
            <Button buttonType='google' onClick={logGoogleUser}>Sing In with Google</Button>

        </div>
    )
}

export default SignInForm