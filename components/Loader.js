"use client";
import Image from "next/image";
import { ThreeCircles } from "react-loader-spinner";

const Loader = ({ text, text1 }) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-[rgb(0,0,0)] bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)] bg-transparent flex justify-center items-center z-[10000000]">
      <div className=" max-w-sm min-w-[300px] flex flex-col gap-6 p-4 py-8 justify-center items-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80  rounded-lg">
        

      
        <Image src={'/img/loader.gif'} width={32} height={32} alt="Loader" className="w-32 h-32 text-white" />
        <div className="flex justify-center items-center !text-white">
          {text1 ? (
            <p className="text-2xl !text-white" style={{color: 'white'}}></p>
          ) : text ? (
            <p className="text-2xl !text-white" style={{color: 'white'}}>{text}...</p>
          ) : (
            <p className="text-2xl">loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loader;
