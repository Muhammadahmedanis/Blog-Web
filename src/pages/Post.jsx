import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { HiPencilSquare } from "react-icons/hi2";
import config from "../config/config.js";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    // console.log(userData);
    
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // console.log(isAuthor);
    
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);
    
    
    const deletePost = () => {
        console.log(post.featuredImage, post.$id);
        appwriteService.deletePost(post.$id, config.appwriteBucketId).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return isAuthor ? 
        <div className="p-4 min-w-[370] max-w-[800px] border-2 text-[#966a38] border-[#dcca95] bg-[#eae1be] shadow-inner mx-auto rounded-xl">
            <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl w-full max-h-[400px]" />
            <div className="my-2">
                <h5>{post.topic}</h5>
                <h2 className="text-xl font-bold text-[#62472c]">{post.title}</h2>
            </div>
            <div>
                {parse(post.content)}
            </div>
            {isAuthor && (
                <div className="my-4">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button className="mr-3 bg-[#f5f1df] border-[#dcca95] text-[#966a38] hover:bg-[#c29a4d] hover:text-[#f5f1df] ">
                            <div className="flex items-center text-[17px] gap-2 font-semibold">
                                Edit
                                <HiPencilSquare size={20} />
                            </div>
                        </Button>
                    </Link>
                    <Button className="bg-[#f5f1df] border-[#dcca95] text-[#966a38] hover:bg-[#c29a4d] hover:text-[#f5f1df] " onClick={deletePost}>
                        <div className="flex items-center text-[17px] gap-2 font-semibold ">
                            Delete
                            <MdDeleteOutline size={20} />
                        </div>
                    </Button>
                </div>
            )}
        </div> : navigate('/')
}