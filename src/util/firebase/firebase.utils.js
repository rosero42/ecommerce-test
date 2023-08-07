import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth'
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

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


  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth
      const createdAt = new Date()
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        })
      }catch(ex){
        console.log('exception creating the user', ex.message)
      }
    }

    return userDocRef
  }

