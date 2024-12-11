import React from 'react';
import appwriteService from '../appwrite/configuration';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { useEffect } from 'react';

function PostCard({ $id, title, featuredImage, content, $createdAt, userName, topic }) {
  const regex = /^\d{4}-\d{2}-\d{2}/;
  const date = $createdAt.match(regex);
  const regex2 = /^(\b\w+\b\W*){1,150}/;

  useEffect(() => {

  }, [])
  
  return (
    <div>
        <Link to={`/post/${$id}`}>
            <div className='max-w-[350px] bg-blue-50 rounded-xl p-4'>
                <div className='max-w-[300px] justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl w-full' />
                </div>
                <p>{topic}</p>
                <h2 className='text-2xl font-bold my-2'>{title}</h2>
                <div>
                  {parse(content.slice(1, 150))}
                </div>
                <div className='flex items-center gap-2 my-2'>
                  <div className='border-2 rounded-full h-14 w-14'>
                    <img src="" alt="" />
                  </div>
                  <div>
                    <h1>{userName}</h1>
                    <p>{date}</p>
                  </div>
                </div>
            </div>
        </Link>
    </div>
  )
}
export default PostCard