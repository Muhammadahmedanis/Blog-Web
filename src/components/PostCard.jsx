import React, { useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

function PostCard({ $id, title, featuredImage, content, $createdAt, userName, topic, userId }) {
  const regex = /^\d{4}-\d{2}-\d{2}/;
  const date = $createdAt.match(regex);  
  const[posts, setPosts] = useState([]);
  // console.log(userName);
  appwriteService.getUserPost([]).then((posts) =>{
    setPosts(posts.documents);
  }).catch((err) => {
    console.log(err + " getting user post");
  })  
  
    return (
      <div>
        <Link to={`/post/${$id}/${userId}`}>
          { (<div className=' min-w-[270] max-w-[325px] text-[#dc8850] bg-[rgb(219,202,154)] rounded-xl p-4'>
              <div className='max-w-[300px] justify-center mb-4'>
                  <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-44 w-full' />
              </div>
              <p className='text-left px-2'>{topic}</p>
              <h1 className='text-xl font-bold my-2 text-left px-2'>{title}</h1>
              <div className='text-[1rem] h-32 text-left px-2'>
                {parse(content.slice(3, 150))}
              </div>
              <div className='flex items-center gap-2 my-2'>
                <div className='border-1 rounded-full h-14 w-14'>
                  {
                    posts?.map((data) => {
                      return data.userName === userName && <img key={data.$id} className='object-cover w-[65px] h-[60px] rounded-full' src={data.userImage} alt="" />
                    })
                  }
                  <img src="" alt="" />
                </div>
                <div>
                  <h1>{userName}</h1>
                  <p>{date}</p>
                </div>
              </div>
            </div>)}
        </Link>
      </div>
    )
} 
export default PostCard