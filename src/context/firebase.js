import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD9L5I27H56G7hpepFDBA98pFbQbP4ri8w",
  authDomain: "bookify-dc913.firebaseapp.com",
  projectId: "bookify-dc913",
  storageBucket: "bookify-dc913.appspot.com",
  messagingSenderId: "458959807576",
  appId: "1:458959807576:web:c3d4091a7bdbea1ee6d62d",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const [User, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth,(user)=>{
            if (user) {
                setUser(user);
            }else{
                setUser(null)
            }
        })
    }, [])
    

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).catch((error)=>alert("User not found. Please login again"))
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  }

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageref = ref(storage, `uploads/images/${Date.now()}${cover.name}`);
    const uploadResult = await uploadBytes(imageref, cover);
    return await addDoc(collection(firestore, "books"),{
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: User.uid,
      userEmail: User.email,
      displayName: User.displayName,
      photoURL: User.photoURL
    })
  }

  const userSignOut = () => {
    signOut(auth);
  }

  const isLoggedIn = User ? true : false;

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, loginUserWithEmailAndPassword, signInWithGoogle, handleCreateNewListing, userSignOut, isLoggedIn, User }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
