import React, { useState } from 'react';
import {Container, Logo, LogoutBtn} from './index';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { RiBloggerLine } from "react-icons/ri";
import { HiPencilSquare } from "react-icons/hi2";
import { SiSimplelogin } from "react-icons/si";
import { SiGnuprivacyguard } from "react-icons/si";

function Header() {
  const[isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: <IoHomeOutline size={22} />,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: <SiSimplelogin size={25}/>
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
      icon: <SiGnuprivacyguard size={20}/>
    },
    {
      name: "My Post",
      slug: "/my-post",
      active: authStatus,
      icon: <HiPencilSquare size={22} />
    },
    {
      name: "Create Post",
      slug: "create-post",
      active: authStatus,
      icon: <RiBloggerLine size={21} />,
    }
  ]

  return (
    <nav className="shadow bg-gradient-to-l from-[#cfb270] to-[#eae1be]  dark:bg-gray-900 sticky top-0 w-full z-10">
      <div className="w-full max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div>
            <Link to='/'> <Logo width='60px'/> </Link>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center p-2 w-12 h-10 justify-center text-sm rounded-lg md:hidden bg-[#dc8850] text-[rgb(236,227,202)] hover:bg-[rgb(245,232,196)] hover:text-[#dc8850] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isMenuOpen}>
            <GiHamburgerMenu size={30} />
        </button>
        <div className={`${ isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col gap-3 p-2 md:p-0 md:flex-row md:space-x-8l rounded-lg">
              {
                navItems.map((item) =>  
                  item.active ? (
                    <li  className={`py-2 px-4 text-[18px]  font-medium rounded-lg border-2 bg-[#f5f1df] border-[#dcca95] text-[#966a38] hover:bg-[#c29a4d] hover:text-[#f5f1df] focus:outline-none focus:bg-blue-200`} key={item.name}>
                      <button className='w-full justify-center flex items-center gap-2' onClick={() => navigate(item.slug)} >{item.name} {item.icon}</button>
                    </li>
                  ) : null
              )}
              { authStatus && (
                  <li>
                  <LogoutBtn />
                </li>
              ) }
          </ul>
        </div>
      </div>
    </nav> 
  )
}
export default Header




