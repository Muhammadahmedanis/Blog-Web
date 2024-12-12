import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard } from '../components';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { login, logout } from '../store/authSlice'
function Home() {
    const[posts, setPosts] = useState([]);
    const[loader, setLoader] = useState(true);
    const dispatch = useDispatch();
    // useEffect(() => {
    //   authService.getCurrentUser()
    //   .then((userData) => {
    //     console.log(userData);
        
    //     if(userData){
    //       dispatch(login(userData));
    //     } else{
    //       dispatch(logout());
    //     }
    //   }).catch((err) => {
    //     console.log("error", err);
    //   })
    //   .finally(() => {
    //     setLoader(false);
    //   })
    // }, [])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
        .catch((err) => (console.log(err)))
    }, [])
    
    
    if(posts.length === 0) {
        return(
            <div className="w-full text-center">
                <div className="w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500"> Login to read posts </h1>
                </div>
            </div>
        )
    } else {
        return(
            <div className='py-6'>
                <Container>
                <div className='flex flex-wrap gap-5'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                </Container>
            </div>
        )
    }

}

export default Home