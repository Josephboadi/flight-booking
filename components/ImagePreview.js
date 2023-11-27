import Image from 'next/image';
import React from 'react'
import { RiCloseFill } from 'react-icons/ri';

const ImagePreview = ({imageUrl, closeImageModal}) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)] z-[10000000]">
          <div className="relative mx-6  w-full sm:w-[640px] bg-[#fff] shadow-2xl rounded-md max-h-[70vh] h-[70vh]">
          <div
              onClick={closeImageModal}
              className=" absolute -top-4 -right-2 flex  p-3  justify-center items-center bg-[#f2f2f2] rounded-full shadow-lg cursor-pointer hover:scale-95"
            >
              <RiCloseFill className=" text-lg " />
            </div>
          <Image
            
            alt="ImagePreview"
            src={imageUrl}
            className="w-full rounded-md h-full"
          />
          </div>
        </div>
  )
}

export default ImagePreview