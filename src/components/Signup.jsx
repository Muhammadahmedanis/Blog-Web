import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo} from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import service from '../appwrite/configuration';
import { useForm } from 'react-hook-form';
import { MdLockPerson } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function Signup() {
    const navigate = useNavigate();
    const[error, setError] = useState("");
    const dispatch = useDispatch();
    const { register,  handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            const fileId = file.$id;
            const userImage = service.getFilePreview(fileId);
            
            const payLoad = { ...data, userImage };
            // console.log(payLoad, "payload");
    
            const userData = await authService.createAccount(payLoad);
            // console.log(userData, "userData");
    
            if (userData) {
                const currentUserData = await authService.getCurrentUser();
                if (currentUserData) {
                    dispatch(login(currentUserData));
                }
    
                const imageUrl = await service.userPost(currentUserData.name, userImage);
                // console.log(imageUrl, "imageUrl");
    
                navigate(`/`);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    

  return (
    <div className="flex items-center justify-center py-4">
        <div className={`mx-auto w-full max-w-lg shadow bg-[rgb(235,221,183)] rounded-xl p-10`}>
            <div className="mb-2 flex justify-center">
                <h2 className="text-center text-2xl text-[#dc8850] font-bold leading-tight">Signup to create account</h2>
            </div>
            {error &&  <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input label="User Image: " type="file" className="my-2" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image", { required: "image is required"})} />
                    <Input label="Full Name: " icon={<FaUser size={20} />} placeholder="Enter your name" {...register("name", { required: true })} />
                    <Input label="Email: " icon={<MdEmail size={20} />} placeholder="Enter your email" type="email" {...register("email", {required: true, validate: { matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address", }})}  /> 
                    <Input label="Password: " icon={<MdLockPerson size={20} />} type="password" placeholder="Enter your password" {...register("password", {required: true, })} />   
                    <Button type="submit" className="w-full py-2 px-5 text-center text-[18px] font-medium rounded-lg border border-transparent bg-[#dc8850] text-[rgb(236,227,202)] hover:bg-[rgb(245,232,196)] hover:text-[#dc8850] focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900">Create Account</Button>
                </div>
            </form>
            <p className="mt-2 text-center text-base text-[#dc8850]">
                Already have an account?&nbsp;
                <Link to="/login" className="text-primary transition-all duration-200 !text-[#f4914e] font-bold hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    </div>
  )
}
export default Signup