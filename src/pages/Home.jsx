import React, { useEffect, useState, Component } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard } from '../components';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { login, logout } from '../store/authSlice'
import Loader from '../components/Loader';
import img1 from  '/image1.jpg';
import img2 from '/image2.png';
import img3 from '/image3.png';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


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
            <div className="text-center">
                    <div className='flex flex-wrap justify-center py-3'>
                        <div className='border-black border-1 max-w-[52%] max-h-[390px] px-5 py-2 text-left rounded'>
                            <h1 className='font-extrabold text-[16px] lg:text-[28px] my-4'>Create Your Own Blog and Share Your Unique Story with the World.</h1>
                            <p className='my-1 text-[17px]'>Unleash your creativity and build a stunning, personalized blog that reflects your style and brand identity. Connect with a global audience and grow your reach effortlessly using powerful, built-in marketing tools. Whether you're sharing personal experiences, </p>
                            <p>Turn your hobby into a thriving business by monetizing your content with flexible options like subscription paywalls or exclusive member-only access. Inspire others, share your voice, and make an impact because your story deserves to be heard by the world. Start your blogging journey today!</p>
                        </div>
                        <div className=' max-w-[43%] rounded'>
                        <Carousel autoPlay interval={2000} infiniteLoop showArrows={false} showThumbs={false} dynamicHeight>
                            <div>
                                <img className='h-96' src={img1} />
                            </div>
                            <div>
                                <img className='h-96' src={img2} />
                            </div>
                            <div>
                                <img className='h-96' src={img3} />
                            </div>
                            
                        </Carousel>
                        </div>
                    </div>
                    {/*  */}
                    {/* <Loader /> */}
            </div>
        )
    } else {
        return(
            <div className='py-6'>
                <Container>
                <div className='flex flex-wrap justify-center gap-5'>
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