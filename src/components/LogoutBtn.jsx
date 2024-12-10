import React from 'react'
import { useDispatch } from 'react-redux';
import  authService  from '../appwrite/auth';
import { logout } from '../store/authSlice';
import { AiOutlineLogout } from "react-icons/ai";

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
    }

  return (
    <button onClick={logoutHandler} className='py-2 px-5 text-[18px] font-medium rounded-lg border border-transparent bg-blue-200 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900'>
      Logout
      <AiOutlineLogout size={20} />
    </button>
  )
}

export default LogoutBtn