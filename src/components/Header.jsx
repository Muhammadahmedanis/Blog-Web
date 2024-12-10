import React from 'react';
import {Container, Logo, LogoutBtn} from './index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: authStatus,
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
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
  ]

  return (
    <nav className="shadow bg-blue-100 dark:bg-gray-900 fixed top-0 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div>
            <Link to='/'> <Logo width='60px'/> </Link>
        </div>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-3 w-16 h-10 justify-center text-sm rounded-lg md:hidden bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <GiHamburgerMenu size={30} />
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {
                navItems.map((item) => 
                  item.active ? (
                    <li key={item.name}>
                      <button onClick={() => navigate(item.slug)} className='py-2 px-5 text-[18px] font-medium rounded-lg border border-transparent bg-blue-200 text-blue-800 hover:bg-blue-300 focus:outline-none focus:bg-blue-200'>{item.name}</button>
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




