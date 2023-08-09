import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
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
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)


  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
    console.log('create user doc from auth')
    if(!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth
      const createdAt = new Date()
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        })
      }catch(ex){
        console.log('exception creating the user', ex.message)
      }
    }

    return userDocRef
  }


export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
