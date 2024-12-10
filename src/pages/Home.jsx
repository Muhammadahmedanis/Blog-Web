import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard } from '../components';

function Home() {
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        posts.length && appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
        .catch((err) => (console.log(err)))
    }, [])

    if(posts.length === 0) {
        return(
            <div className="w-full py-8 pt-36 text-center bg-blue-200">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else {
        return(
            <div className='w-full py-8'>
                <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
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