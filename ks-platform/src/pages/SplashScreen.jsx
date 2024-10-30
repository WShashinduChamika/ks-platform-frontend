import React, {useEffect, useState} from 'react'
import logo from '../assets/splash_screen/logo.png'
import {useNavigate} from "react-router-dom";

function SplashScreen() {

    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(()=>{
          const isloggedIn = localStorage.getItem('isLoggedIn');
          if(isloggedIn){
              navigate('/home')
          }else{
              navigate('/login')
          }
      },3000)
    }, []);

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
               <div className='flex flex-col items-center'>
                   <img src={logo} alt='logo'  className='h-28 md:h-32' />
                   <div className='mt-5 w-10 md:w-12 h-10 md:h-12 border-[5px] md:border-[6px] border-blue-200 border-t-primary rounded-full animate-spin'></div>
               </div>
        </div>
    )
}

export default SplashScreen
