import { useEffect } from "react"
import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect 
} from "../../../util/firebase/firebase.utils" 
import { getRedirectResult } from "firebase/auth"

const SignIn = () =>{

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>

        </div>
    )
}

export default SignIn