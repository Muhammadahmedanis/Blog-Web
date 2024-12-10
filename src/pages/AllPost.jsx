import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard } from '../components';
import { Query } from 'appwrite';

function AllPost() {
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                // console.log(posts);
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
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4 '>
                                <PostCard {...post} /> 
                            </div>
                        ) )}
                    </div>
                </Container>
            </div>
        )
    }
}

export default AllPost