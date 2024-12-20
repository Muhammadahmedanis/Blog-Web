import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment';

let times = (time) => {
  const givenDate = moment( time, "YYYY-MM-DD");
  const today = moment();
  const daysAgo = today.diff(givenDate, 'days');
  return daysAgo;
}


function PostCard({ $id, title, featuredImage, content, $createdAt, userName, topic, userId }) {
  const regex = /^\d{4}-\d{2}-\d{2}/;
  const date = $createdAt.match(regex);  
  const[posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getUserPost([]).then((posts) =>{
      setPosts(posts.documents);
    }).catch((err) => {
      console.log(err + " getting user post");
    })  
  }, [])
  
    return (
      <div>
        <Link to={`/post/${$id}/${userId}`}>
          { (<div className=' min-w-[270] max-w-[370px] bg-[#eae1be] rounded-xl p-4'>
              <div className='flex items-center gap-1 my-2'>
                <div className='border-1 rounded-full h-14 w-14'>
                  {
                    posts?.map((data) => {
                      return data.userName === userName && <img key={data.$id} className='object-cover w-[50px] h-[50px] rounded-full' src={data.userImage} alt="" />
                    })
                  }
                </div>
                <div className='text-left'>
                  <h1 className='font-bold text-[#62472c]'>{userName}</h1>
                  <p className='text-[#966a38]'>{`Posted ${times(date)} days ago`}</p>
                </div>
              </div>
              <div className='max-w-[350px] justify-center mb-4'>
                  <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-44 w-full' />
              </div>
              <p className='text-left px-2 text-[#966a38]'>{topic}</p>
              <h1 className='text-xl font-bold my-2 text-left px-2 text-[#62472c]'>{title}</h1>
              <div className='text-[1rem] h-auto text-left px-2 pb-4 text-[#966a38]'>
                {parse(content.slice(3, 150))}
              </div>
            </div>)}
        </Link>
      </div>
    )
} 
export default PostCard