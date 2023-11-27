import React from 'react'
import { RiCloseFill } from "react-icons/ri";
import { TbConfetti } from "react-icons/tb";
import { VscError } from "react-icons/vsc";

const Alert = ({closeSharedModal, message, type}) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-[rgba(0,0,0,0.2)] z-[10000000000]">
          <div className="relative mx-6  w-full sm:w-[460px] bg-[#f2f2f2] shadow-2xl rounded-md p-6 sm:px-8 pb-10">
            <div
              onClick={closeSharedModal}
              className=" absolute -top-4 -right-2 flex  p-3  justify-center items-center bg-white rounded-full shadow-lg cursor-pointer hover:scale-95"
            >
              <RiCloseFill className=" text-lg " />
            </div>

            <div className="flex w-full justify-between items-center">
                {type === "success" ? (
                    <p className=" text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#10ff10] to-[#ffad06] ">
                    Success
                  </p>
                ): (
                    <p className=" text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5810] to-[#ffad06] ">
                Error
              </p>
                )}
              
            </div>

            <div className='flex justify-center items-center my-2'>
            {type === "success" ? (
                <TbConfetti className='text-[80px] text-green-500'/>
            ):(
                <VscError className='text-[80px] text-red-600'/>
            )}
        
                
            </div>

            <div className=" p-10 py-6 ">
            {type === "success" ? (
                <p className="text-center text-xl text-green-800">{message}</p>
            ):(
                <p className="text-center text-xl text-red-700">{message}</p>
            )}
              
            </div>
          </div>
        </div>
  )
}

export default Alert