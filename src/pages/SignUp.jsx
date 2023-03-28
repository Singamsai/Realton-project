import React from 'react'
import { useState } from 'react';
import {AiFillEyeInvisible} from 'react-icons/ai'
import {AiFillEye} from 'react-icons/ai'
import {Link, useNavigate} from "react-router-dom"
import OAth from '../components/OAth';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { db } from '../firebase';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const SignUp = () => {
  const[showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email:"",
    password:'',
    name:"" 
  })
  const {email, password, name} = formData;
  function onChange(e){
    setformData((prevState)=>({ 
      ...prevState, [e.target.id]:e.target.value,
    }))
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth =  getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCredential.user
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();
      
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      navigate('/');
      toast.success("sign-in successfull")
    } catch (error) {
      if(name==="")
      toast.error("name is missing")
      else if(email==="")
      toast.error("email is missing")
      else if(password==="")
      toast.error("password is missing ")
      else
      toast.error("something went wrong")

    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto '>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80" 
          alt="key" className='w-full rounded-2xl'></img>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20 '>
          <form onSubmit={onSubmit}>
          <input  type="text" id="name" value={name}
            onChange={onChange}
            placeholder="Full name"
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 
            rounded transition ease-in-out mb-6'
            />
            <input  type="email" id="email" value={email}
            onChange={onChange}
            placeholder="Email Address"
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 
            rounded transition ease-in-out mb-6'
            />
            <div className='relative mb-6'>
              <input  type={showPassword?'text':'password'} id="password" value={password}
              onChange={onChange}
              placeholder="Password"
              className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 
              rounded transition ease-in-out' 
              />
              {showPassword?(
                <AiFillEyeInvisible className='absolute text-xl right-3 top-3 cursor-pointer' onClick={()=>{setShowPassword(!showPassword)}}/>
              ):(
                <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>{setShowPassword(!showPassword)}}/>
              )}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>already have an Account? 
                <Link to='/sign-in' className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out'> Sign in</Link>
                </p>
            </div>
          <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded
          shadow-md hover:bg-blue-700 transition duration-15000 ease-in-out hover:shadow-lg active:bg-blue-800'>
            Sign Up</button>
            <div className='flex items-center my-4 before:border-gray-300
            before:border-t before:flex-1 after:border-gray-300
            after:border-t after:flex-1'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAth />
            </form>
        </div>
      </div>
    </section>

  )
}

export default SignUp
