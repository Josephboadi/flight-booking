'use client'
import React from 'react';

// import smalllogo from '../assets/logo.jpeg';
import { MdMenuOpen, MdClose, MdMenu, MdSettingsPower } from 'react-icons/md';

import Image from 'next/image';
import useLogout from './hooks/useLogout';


const Header = ({ toggle, toggleLogo, toggleSidbar, toggleSide }) => {
const logout  = useLogout()
  const logOutRequest = () => {
    logout()
  }

  return (
    <header className='w-full h-[8vh] bg-[rgb(0,0,0)] bg-gradient-to-r from-[rgba(0,0,0,0.9)] to-[rgba(237,138,0)] bg-transparent flex flex-row items-center'>
      <div className='flex-1 flex items-center mr-4'>
        <div className='flex items-center gap-3 flex-1'>
          <div className='flex items-center sm:ml-2 gap-3'>
          <Image
          src={'/assets/small.png'}
          width={40}
              height={40}
          alt='Logo'
          className={`block sm:hidden w-[40px] h-[40px] object-contain rounded-full`}
        />
            {toggle ? (
              <MdMenuOpen
                onClick={toggleLogo}
                className='hidden sm:block text-2xl text-[#fff] cursor-pointer hover:text-3xl hover:-translate-y-0 hover:scale-110 transition ease-in-out delay-150 duration-300'
              />
            ) : (
              <MdClose
                onClick={toggleLogo}
                className='hidden sm:block text-2xl text-[#fff] cursor-pointer hover:rotate-180 hover:text-3xl hover:-translate-y-0 hover:scale-110 transition ease-in-out delay-150 duration-300'
              />
            )}

            {toggleSide ? (
              <MdClose
                onClick={toggleSidbar}
                className='block sm:hidden text-2xl text-[#fff] cursor-pointer hover:text-3xl hover:-translate-y-0 hover:scale-110 transition ease-in-out delay-150 duration-300'
              />
            ) : (
              <MdMenu
                onClick={toggleSidbar}
                className='block sm:hidden text-2xl text-[#fff] cursor-pointer hover:text-3xl hover:-translate-y-0 hover:scale-110 transition ease-in-out delay-150 duration-300'
              />
            )}

            <div className='flex-1 flex justify-center items-center'>
              
              <h1 className='text-[#fff] text-lg font-bold'> CalAuth</h1>
            </div>
          </div>
        </div>
        {/* <form method='post' action='/logout' id='logout-form'> */}
          <button onClick={logOutRequest} className='cta'>
            <MdSettingsPower className=' text-3xl text-[#fff] font-black shadow-sm cursor-pointer hover:text-3xl hover:-translate-y-0 hover:scale-110 transition ease-in-out delay-150 duration-300' />
          </button>
        {/* </form> */}
      
      </div>
    </header>
  );
};

export default Header;
