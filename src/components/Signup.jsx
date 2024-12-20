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
    const[isLoading, setIsLoading] = useState(false);
    

    const create = async (data) => {
        setIsLoading(true)
        setError("");
        try {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            const fileId = file.$id;
            const userImage = service.getFilePreview(fileId);
            const payLoad = { ...data, userImage };
            const userData = await authService.createAccount(payLoad);
            if (userData) {
                const currentUserData = await authService.getCurrentUser();
                if (currentUserData) {
                    console.log(currentUserData, "Signup");
                    dispatch(login(currentUserData));
                }
                const imageUrl = await service.userPost(currentUserData.name, userImage);
                navigate(`/`);
            }
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false)
    };
    

  return (
    <div className="flex items-center justify-center py-4">
        <div className={`mx-auto w-full max-w-lg shadow border-2 border-[#dcca95] bg-[#eae1be] rounded-xl p-10`}>
            <div className="mb-2 flex justify-center">
                <h2 className="text-center text-2xl text-[#62472c] font-bold leading-tight">Signup to create account</h2>
            </div>
            {error &&  <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input label="User Image: " type="file" className="my-2" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image", { required: "image is required"})} />
                    <Input label="Full Name: " icon={<FaUser size={20} />} placeholder="Enter your name" {...register("name", { required: true })} />
                    <Input label="Email: " icon={<MdEmail size={20} />} placeholder="Enter your email" type="email" {...register("email", {required: true, validate: { matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address", }})}  /> 
                    <Input label="Password: " icon={<MdLockPerson size={20} />} type="password" placeholder="Enter your password" {...register("password", {required: true, })} />   
                    <Button type="submit" className="w-full py-2 px-5 text-center text-[18px] font-medium rounded-lg border-2 border-transparent bg-[#f5f1df] border-[#dcca95] text-[#966a38] hover:bg-[#c29a4d] hover:text-[#f5f1df] focus:outline-none focus:bg-[rgb(235,221,183)]  disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900">Create Account {isLoading && <Loading />} </Button>
                </div>
            </form>
            <p className="mt-2 text-center text-base text-[#966a38]">
                Already have an account?&nbsp;
                <Link to="/login" className="text-primary transition-all duration-200 !text-[#62472c] font-bold hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    </div>
  )
}

const Loading = () => {
    return (
        <svg aria-hidden="true" className="inline w-16 h-8 text-gray-100 animate-spin dark:text-gray-600 fill-[#966a38]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
         </svg>
    )
}

export default Signup