import React, { useEffect, useState, Component } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, LogoutBtn, PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice'
import { RiArticleFill } from "react-icons/ri";
import img1 from  '/image1.jpg';
import img2 from '/image2.png';
import img3 from '/image3.png';
import img4 from '/image5.png';
import img5 from '/image6.png';
import img6 from '/image7.png';
import img7 from '/image8.png';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


function Home() {
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
        .catch((err) => (console.log(err)))
    }, [posts])
    
        return(
            <div className="py-8 text-center">
            <div className="flex flex-wrap justify-center gap-2">
                <div className="px- border-[rgb(219,202,154)] border-2 w-[320px] md:w-[480px] lg:w-[650px] text-left rounded">
                    <h3 className="font-extrabold text-[16px] lg:text-[28px] m-3 text-[#62472c]">
                    Create Your Own Blog and Share Your Unique Story with the World.
                    </h3>
                    <p className="m-3 text-[17px] text-[#966a38]">
                    Unleash your creativity and build a stunning, personalized blog that reflects your style and brand identity.
                    Connect with a global audience and grow your reach effortlessly using powerful, built-in marketing tools.
                    Whether you're sharing personal experiences,
                    </p>
                    <p className="m-3 text-[#966a38]">
                    Turn your hobby into a thriving business by monetizing your content with flexible options like subscription
                    paywalls or exclusive member-only access. Inspire others, share your voice, and make an impact because your
                    story deserves to be heard by the world. Start your blogging journey today!
                    </p>
                </div>

                <div className="rounded w-[320px] md:w-[370px] lg:w-[500px]">
                    <Carousel autoPlay interval={2000} infiniteLoop showArrows={false} showThumbs={false} dynamicHeight>
                    <div>
                        <img className="h-96" src={img1} alt="Image 1" />
                    </div>
                    <div>
                        <img className="h-96" src={img2} alt="Image 2" />
                    </div>
                    <div>
                        <img className="h-96" src={img3} alt="Image 3" />
                    </div>
                    </Carousel>
                </div>
            </div>
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
            <div className='bg-[#eae1be] my-2'>
                <div className='flex justify-center items-center gap-1'>
                    <h2 className='text-2xl font-bold py-1 text-[#62472c]'> Most read Articles </h2>
                    <RiArticleFill className='mt-1 text-[#62472c]' size={20}/>
                </div>
                <div className='flex flex-wrap gap-2 justify-center py-2 text-[#966a38]'>
                    <div className='w-[320px] md:w-[350px] xl:w-[550px] text-left font-semibold m-1'>
                        <img src={img4} alt="" />
                        <p className='p-2'>A blog post is any article, news piece, or guide that's published in the blog section of a website. A blog post typically covers a specific topic or query, is educational in</p>
                    </div>
                    <div className='w-[320px] md:w-[500px] xl:w-[650px]'>
                        <div className=' m-1 w-[420px] flex gap-2 text-left p-1'>
                            <img className='rounded lg:w-[130px] w-[115px]' src={img5} alt="" />
                            <p className='text-sm w-[200px]'>software development, artificial intelligence, programming languages, and industry trends.</p>
                        </div>
                        <div className=' m-1 w-[420px] flex gap-2 text-left p-1'>
                            <img className='rounded lg:w-[130px] w-[115px]' src={img6} alt="" />
                            <p className='text-sm w-[200px]'>software development, artificial intelligence, programming languages, and industry trends.</p>
                        </div>
                        <div className=' m-1 w-[420px] flex gap-2 text-left p-1'>
                            <img className='rounded lg:w-[130px] w-[115px]' src={img7} alt="" />
                            <p className='text-sm w-[200px]'>software development, artificial intelligence, programming languages, and industry trends.</p>
                        </div>
                        <div className=' m-1 w-[420px] flex gap-2 text-left p-1'>
                            <img className='rounded lg:w-[130px] w-[115px]' src={img4} alt="" />
                            <p className='text-sm w-[200px]'>software development, artificial intelligence, programming languages, and industry trends.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Home