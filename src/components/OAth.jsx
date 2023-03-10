import React from 'react'
import {FcGoogle} from 'react-icons/fc'

export default function OAth() {
  return (
    <div>
      <button type='submit' className=' flex justify-center items-center w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded
          shadow-md hover:bg-red-700 transition duration-15000 ease-in-out hover:shadow-lg active:bg-red-800'>
            <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
            Continue with Google</button>
    </div>
  )
}
