import React from 'react';
import {Container, Logo, LogoutBtn} from './index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { RiBloggerLine } from "react-icons/ri";
import { HiPencilSquare } from "react-icons/hi2";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
      icon: <IoHomeOutline size={22} />,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
      icon: <HiPencilSquare size={22} />
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: <RiBloggerLine size={21} />,
    }
  ]

  return (
    <nav className="shadow bg-blue-100 dark:bg-gray-900 fixed top-0 w-full z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div>
            <Link to='/'> <Logo width='60px'/> </Link>
        </div>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-3 w-16 h-10 justify-center text-sm rounded-lg md:hidden bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <GiHamburgerMenu size={30} />
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col gap-3 p-4 md:p-0 md:flex-row md:space-x-8l rounded-lg">
              {
                navItems.map((item) =>  
                  item.active ? (
                    <li className='py-2 px-5 text-[18px] font-medium rounded-lg border border-blue-300  bg-blue-200 text-blue-800 hover:bg-blue-300 focus:outline-none focus:bg-blue-200' key={item.name}>
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




