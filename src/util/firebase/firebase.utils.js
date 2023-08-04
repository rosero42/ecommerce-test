import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signIn, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApiW5KEnRMaeaUJVg8T3d7Bn6nfIim_rA",
    authDomain: "ecommerce-test-db-7c2aa.firebaseapp.com",
    projectId: "ecommerce-test-db-7c2aa",
    storageBucket: "ecommerce-test-db-7c2aa.appspot.com",
    messagingSenderId: "510230008438",
    appId: "1:510230008438:web:8d0ad39b2e315671344557"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()

  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)