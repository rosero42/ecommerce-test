import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

export const signInAndCheckEmailAndPassword = async (email, password) =>{
  if(!email || !password) return
  return await signInWithEmailAndPassword(auth, email,password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)



//One off used to add shop data to the database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  });

  await batch.commit()
  console.log("done")
}

export const getCategoriesAndDocuments = async () =>{
  const collectionRef = collection(db, 'categories')

  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  },{})
  return categoryMap
}

/**
 * '{clothing title}: {
 *                        "id":
 *                        "imageUrl"
 *                        "name"
 *                        "price"
 *                     }
 */