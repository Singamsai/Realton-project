import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router'

export default function Header() {
    const [pageState, setPageState] = useState("Sign in")
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth()
    useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        if(user){
          setPageState('Profile')
        }
        else{
          setPageState("Sign in")
        }
      })
    },[auth])
    function Pathmatch(route){
        if(route===location.pathname)
        return true;
    }
    console.log(location.pathname)
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
            <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className='h-5 cursor-pointer'
            onClick={()=>{navigate('/')}}></img>
        </div>
        <div>
            <ul className='flex space-x-10'>
                <li className={`cursor-pointer py-3 text-sm font-semibold
                 text-gray-400 border-b-4 border-b-transparent 
                 ${Pathmatch("/") && "text-blue border-b-red-800"}`} 
                 onClick={()=>{navigate('/')}}>Home</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold
                 text-gray-400 border-b-4 border-b-transparent 
                 ${Pathmatch("/offers") && "text-blue border-b-red-800"}`}
                 onClick={()=>{navigate('/offers')}}>Offers</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold
                 text-gray-400 border-b-4 border-b-transparent
                 ${Pathmatch("/sign-in") || Pathmatch("/profile") && "border-b-red-800 text-blue transition duration-200 ease-in-out"}`}
                 onClick={()=>{navigate('/profile')}}>{pageState}</li>
            </ul>
        </div>
      </header>
    </div>
  )
}
