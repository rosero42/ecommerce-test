import { signInWithGooglePopup } from "../../../util/firebase/firebase.utils" 

const SignIn = () =>{
    const logGoogleUser = async () =>{
        const response = await signInWithGooglePopup()
        console.log("@Rosvan "+response)
    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    )
}

export default SignIn