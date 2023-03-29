import { React, useState } from "react";
import {getAuth, updateProfile} from 'firebase/auth'
import { useNavigate } from "react-router";
import {toast} from 'react-toastify'
import {db} from '../firebase'
import { doc, updateDoc } from 'firebase/firestore';



const Profile = () => {
  const navigate = useNavigate()
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = formData
  const [changeDetails, setChangeDetails] = useState(false)
  function onLogout(){
    auth.signOut()
    navigate('/')
  }
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
  }))
  }
  async function onSubmit(){
      try {
        if(auth.currentUser.displayName !== name){
          //update display name in firebase auth
          await updateProfile(auth.currentUser, {
            displayName: name,
          })

          //update name in the firestore

          const docRef = doc(db, "users", auth.currentUser.uid)
          await updateDoc(docRef, {
            name,
          })
        }
        toast.success('Profile details updated')
      } catch (error) {
        toast.error("could not update")
      }
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center mt-6 font-bold ">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3 ">
          <form>
            {/* Name Input  */}
            <input
              type="text"
              id="name"
              value={formData.name}
              disabled={!changeDetails}
              onChange={onChange}
              className={`w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border-gray-300
            rounded transition ease-in-out ${changeDetails && "bg-red-200 focus:bg-red-200"}`}
            />
            {/* email input  */}
            <input
              type="email"
              id="email"
              value={formData.email}
              disabled={!changeDetails}
              onChange={onChange} 
              className={`w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border-gray-300
              rounded transition ease-in-out ${changeDetails && "bg-red-200 focus:bg-red-200"}`}
            />
            <div className="flex justify-between mb-6 whitespace-nowrap text-sm sm:text-lg">
              <p className="flex items-center  ">
                Do you want to change your name?
                <span onClick={()=>{
                   changeDetails && onSubmit();
                   setChangeDetails(!changeDetails)
                   }} className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer">{changeDetails?'apply change':'edit'}</span>
              </p>
              <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer">Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
