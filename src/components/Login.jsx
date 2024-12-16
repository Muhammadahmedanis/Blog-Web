import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo} from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { MdLockPerson } from "react-icons/md";
import { MdEmail } from "react-icons/md";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const[error, setError] = useState("");
    
    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center w-full py-6'>
        <div className='mx-auto w-full max-w-lg bg-[rgb(235,221,183)]  rounded-xl p-10 shadow'>
            <h2 className='text-center text-2xl font-bold text-[#dc8850] leading-tight'>Sign in to your account</h2>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input label="Email: " icon={<MdEmail size={20} />} placeholder="Enter your email" type="email" {...register("email", {required: true, validate: { matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address", }})}  /> 
                    <Input label="Password: " icon={<MdLockPerson size={20} />} type="Password" placeholder="Enter your password" {...register("password", { required: true })}  />
                    <Button type="submit" className="w-full py-2 px-5 text-center text-[18px] font-medium rounded-lg border border-transparent bg-[#dc8850] text-[rgb(236,227,202)] hover:bg-[rgb(245,232,196)] hover:text-[#dc8850] focus:outline-none  disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900">Signin</Button>
                </div>
            </form>
            <p className="mt-2 text-center text-base text-[#dc8850]">
                Don&apos;t have any account?&nbsp;
                <Link to="/signup" className="!text-[#f4914e] font-bold text-primary transition-all duration-200 hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Login
