import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard } from '../components';

function Home() {
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
        .catch((err) => (console.log(err)))
    }, [])
    // console.log(posts);
    
    if(posts.length === 0) {
        return(
            <div className="w-full text-center">
                <div className="w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500"> Login to read posts </h1>
                </div>
                {/* <div className="flex items-center justify-center">
                </div> */}
                {/* <Container>
                </Container> */}
            </div>
        )
    } else {
        return(
            <div className='w-full py-8'>
                <Container>
                <div className=''>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 flex flex-wrap gap-4'>
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