import { useEffect } from "react"
import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect 
} from "../../../util/firebase/firebase.utils" 
import { getRedirectResult } from "firebase/auth"

import SignUpForm from "../../sign-up-form/sign-up-form.component"
import SignInForm from "../../sign-in-form/sign-in-form.component"

const Authentication = () =>{


    
    return(
        <div>
            <h1>Sign In Page</h1>
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>

        </div>
    )
}

export default Authentication