"use client";
import React from "react";
import Header from "./Header";
import Side from "./Side";

const Layout = ({ children }) => {

  //   console.log(toggleSide, 'layout')
  return (
    <>
    <Header/>
   <div className="pb-[30px] lg:pb-[60px] pt-0 relative z-[1] px-3">
        <span className="w-full h-[7.5rem] absolute start-0 end-0 top-0 z-[-1] bg-[#091E43]"></span>
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            
            <Side/>
            <div
              style={{ zIndex: 2 }}
              className="col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}; 

export default Layout;
{/* //  : <div>{children}</div>}  */}