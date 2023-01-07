import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";

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

export const useFirebase = ()=> useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>;
};
