import React from 'react';
import { Link } from 'react-router-dom'
import Logo from './Logo';
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className="font-roboto">
    <footer className="bg-gradient-to-l from-[#cfb270] to-[#eae1be] relative">
      <div className="pb-8 px-5 ">
        <div className="flex flex-wrap justify-center items-center">
          {/* Column 1: LOGO & Get Started */}
          <div className="w-1/2 lg:w-1/4">
            <div className="footer-logo">
            <div className="flex mb-4 items-center">
                <Logo width="100px" />
            </div>
            </div>
            <div className="mt-3">
              <h2 className="text-[#966a38] font-extrabold text-sm uppercase mb-0">Get Started</h2>
              <ul className="list-none mt-[10px] pl-0 text-[#c29a4d]">
                <li className="mt-[5px]">
                  <a href="#">Start</a>
                </li>
                <li className="mt-[5px]">
                  <a href="#">Documentation</a>
                </li>
                <li className="mt-[5px]">
                  <a href="#">Installation</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Company & Legal */}
          <div className="w-1/2 lg:w-1/4">
            <div className="mt-3">
              <h2 className="text-[#966a38] font-extrabold text-sm uppercase mb-0">Company</h2>
              <ul className="list-none mt-[10px] pl-0 text-[#c29a4d]">
                <li className="mt-[5px]">
                  <a href="#">Contact</a>
                </li>
                <li className="mt-[5px]">
                  <a href="#">News</a>
                </li>
                <li className="mt-[5px]">
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>

            <div className="mt-3">
              <h2 className="text-[#966a38] font-extrabold text-sm uppercase mb-0">Legal</h2>
              <ul className="list-none mt-[10px] pl-0 text-[#c29a4d]">
                <li className="mt-[5px]">
                  <a href="#">Privacy Notice</a>
                </li>
                <li className="mt-[5px]">
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="w-1/2 lg:w-1/4">
            <div className="mt-3">
              <h2 className="text-[#966a38] font-extrabold text-sm uppercase mb-0">Quick Links</h2>
              <ul className="list-none mt-[10px] pl-0 text-[#c29a4d]">
                <li className="mt-[5px]">
                  <a target="_blank" rel="noopener noreferrer" href="#">Support Center</a>
                </li>
                <li className="mt-[5px]">
                  <a target="_blank" rel="noopener noreferrer" href="#">Service Status</a>
                </li>
                <li className="mt-[5px]">
                  <a href="#">Security</a>
                </li>
                <li className="mt-[5px]">
                  <a href="#">Blog</a>
                </li>
                <li className="mt-[5px]">
                  <a href="#">Customers</a>
                </li>
                <li className="mt-[5px]">
                  <a href="#">Reviews</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Call to Action */}
          <div className="w-1/2 lg:w-1/4">
            <div className="mt-3">
              <h2 className="text-[#966a38] font-extrabold text-sm uppercase mb-0">Let's Chat</h2>
              <p className="mt-[10px] mb-[20px] text-[#c29a4d]">Have a support question?</p>
              <a className="bg-[#f5f1df] border-2 border-[#dcca95] text-[#966a38] hover:bg-[#c29a4d] hover:text-[#f5f1df]  py-[12px] px-[30px] rounded-[21px] inline-block font-extrabold text-xs uppercase cursor-pointer transition-all" href="#">Get in Touch</a>
            </div>

            <div className="mt-[30px]">
              <h2 className="text-[#966a38] font-extrabold text-sm uppercase mb-0">You Call Us</h2>
              <p className="mt-[10px]">
                <a className="text-[#c29a4d]" href="tel:0124-64XXXX">0124-64XXXX</a>
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute bottom-0 mt-12 right-0 w-[236px] h-[54px]">
          <svg className="absolute top-0 left-0 block w-[236px] h-[54px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236 54">
            <path className="fill-[#f5f1df] hover:fill-[#c29a4d]" d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"></path>
          </svg>

          {/* Social Media Links */}
          <a className="block w-[26px] h-[26px] absolute top-[22px] left-[12px]" href="#" target="_blank">
            <FaLinkedinIn className='text-[#966a38]' size={25} />
          </a>

          <a className="block w-[26px] h-[26px] absolute top-[12px] left-[70px]" href="#" target="_blank">
            <FaFacebookF className='text-[#966a38]' size={25} />
          </a>

          <a className="block w-[26px] h-[26px] absolute top-[22px] right-[80px]" href="#" target="_blank">
            <RiTwitterXLine className='text-[#966a38]' size={25} />
          </a>

          
          <a className="block w-[26px] h-[26px] absolute top-[20px] right-[25px]" href="#" target="_blank">
            < FaInstagram className='text-[#966a38] ' size={25} />
          </a>
          
        </div>
      </div>
    </footer>
  </div>

    
  )
}

export default Footer