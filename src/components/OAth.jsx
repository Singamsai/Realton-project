import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router'
import {toast} from 'react-toastify'

export default function OAth() {
  const navigate = useNavigate()
  async function onGoogleClick(){
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      //check for the user
      const docRef = doc(db, "users", user.uid)
      const docsnap = await getDoc(docRef);
      if(!docsnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }

      navigate('/')
    } catch (error) {
      toast.error("could not authorize with google")
      console.log(error); 
    }
  }
  return (
    <div>
      <button type='button' onClick={onGoogleClick} className=' flex justify-center items-center w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded
          shadow-md hover:bg-red-700 transition duration-15000 ease-in-out hover:shadow-lg active:bg-red-800'>
            <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
            Continue with Google</button>
    </div>
  )
}
