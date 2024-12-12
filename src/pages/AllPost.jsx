import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard } from '../components';
import { Query } from 'appwrite';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AllPost() {
    const userData = useSelector(state => state.auth.userData);
    // console.log(userData);
    // console.log(userData.$id);
    // 675b135d002f3d13e7ca
    
    
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
        .catch((err) => (console.log(err)))
    }, [])
   

    if(posts.length === 0){
    return (
        <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Post Found
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
    )
    } else {
        const filteredposts = posts.filter((post) => ( post.userId === userData.$id));
        return (
            <div className='py-8'>
                <Container>
                    <div className='flex flex-wrap gap-5'>
                        {   
                            filteredposts?.map((post) => (
                                <div key={post.$id}>
                                    <PostCard {...post} /> 
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </div>
        )
    }
}

export default AllPost