import React from 'react'
import { useFirebase } from "../context/firebase";
const Home = () => {
    const firebase = useFirebase();
  return (
    <div>
        { firebase.isLoggedIn ? <div className='text-center mt-5 '> Welcome, {firebase.User.email} </div> : <div className='text-center mt-5 '> Please Login or register to list your book</div> }
    </div>
  )
}

export default Home