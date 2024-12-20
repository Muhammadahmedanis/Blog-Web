import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import  authService  from '../appwrite/auth';
import { logout } from '../store/authSlice';
import appwriteService from '../appwrite/configuration';
import { AiOutlineLogout } from "react-icons/ai";

function LogoutBtn() {
  const dispatch = useDispatch();
      
  const logoutHandler = async () => {
    try {
      await authService.logout(); // Attempt to delete the session
      dispatch(logout()); // Update Redux store
    } catch (error) {
      console.error("Error in logout:", error);
      dispatch(logout()); // Dispatch logout even if session deletion fails
    }
  };
  
    

  return (
    <button onClick={logoutHandler} className='w-full justify-center py-2 px-4 flex items-center gap-2 text-[18px] font-medium rounded-lg border border-transparent bg-[#f5f1df] border-[#dcca95] text-[#966a38] hover:bg-[#c29a4d] hover:text-[#f5f1df] focus:outline-none  disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900'>
      Logout
      <AiOutlineLogout size={20} />
    </button>
  )
}

export default LogoutBtn