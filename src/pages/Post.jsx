import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { HiPencilSquare } from "react-icons/hi2";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // const{ id } = useParams();
    // const postCreator = id == userData?.$id;
    // console.log(postCreator);
    console.log(isAuthor);
    
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post &&
        <div className="p-4  min-w-[270] max-w-[600px] border-2 text-[#dc8850] bg-[rgb(219,202,154)] border-gray-300 shadow-inner mx-auto rounded-xl">
            <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl w-full" />
            <div className="my-2">
                <h5 className="">{post.topic}</h5>
                <h2 className="text-xl font-bold">{post.title}</h2>
            </div>
            <div className="">
                {parse(post.content)}
            </div>
            {isAuthor && (
                <div className="my-4">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            <div className="flex items-center text-[17px] gap-2 font-semibold">
                                Edit
                                <HiPencilSquare size={20} />
                            </div>
                        </Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost}>
                        <div className="flex items-center text-[17px] gap-2 font-semibold">
                            Delete
                            <MdDeleteOutline size={20} />
                        </div>
                    </Button>
                </div>
            )}
        </div>
    // return post ? (
    //     <div className="p-4 my-3 min-w-[270] max-w-[390px] border-2 border-gray-300 shadow-inner mx-auto rounded-xl">
    //             <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl w-full" />
    //             <div className="my-2">
    //                 <h5 className="">{post.topic}</h5>
    //                 <h2 className="text-xl font-bold">{post.title}</h2>
    //             </div>
    //             <div className="">
    //                 {parse(post.content.slice(1, 150))}
    //             </div>

                    
    //     </div>
    // ) : <div className="text-center font-bold text-3xl py-6">You have no Permission to add the post</div>;
}