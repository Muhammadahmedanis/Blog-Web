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
    <div className='flex items-center justify-center w-full pt-24'>
        <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                {/* <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%" />
                </span> */}
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input label="Email: " icon={<MdEmail size={20} />} placeholder="Enter your email" type="email" {...register("email", {required: true, validate: { matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address", }})}  /> 
                    <Input label="Password: " icon={<MdLockPerson size={20} />} type="Password" placeholder="Enter your password" {...register("password", { required: true })}  />
                    <Button type="submit" className="py-2 px-5 text-[18px] font-medium rounded-lg border border-transparent bg-blue-200 text-blue-800 hover:bg-blue-300 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900">Signin</Button>
                </div>
            </form>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Login