import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import  authService  from '../appwrite/auth';
import { logout } from '../store/authSlice';
import appwriteService from '../appwrite/configuration';
import { AiOutlineLogout } from "react-icons/ai";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = async() => {
    try {
      const session = await authService.getCurrentUser(); 
      if (session) {
        await authService.logout(); 
        dispatch(logout()); 
      } else {
        console.log("No active session found");
        dispatch(logout()); 
      }
    } catch (error) {
      console.error("Error in logout:", error);
    }
}     

  return (
    <button onClick={logoutHandler} className='w-full justify-center py-2 px-4 flex items-center gap-2 text-[18px] font-medium rounded-lg border border-transparent bg-[#dc8850] text-[rgb(236,227,202)] hover:bg-[rgb(245,232,196)] hover:text-[#dc8850] focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900'>
      Logout
      <AiOutlineLogout size={20} />
    </button>
  )
}

export default LogoutBtn