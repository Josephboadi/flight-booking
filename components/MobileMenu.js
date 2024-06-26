'use client'
import logo from "@/public/img/logo.png";
import {
    Bars3Icon,
    BuildingOffice2Icon,
    HeartIcon,
    HomeIcon,
    XMarkIcon,
    TicketIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./NavbarMobile";
  
  const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState(1)
    const path = usePathname();
    const toggleOffCanvas = () => {
      setIsOpen((prevState) => !prevState);
    };
    useEffect(() => {
      setIsOpen(false);
    }, [path]);
    return (
      <header className="lg:hidden fixed bottom-0 left-0 right-0 p-2 bg-white shadow z-[52]">
        <ul className=" flex items-center justify-around">
          <li>
            <Link
              href="/"
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-md ${
                path == "/" && "bg-primary text-white"
              }`}>
              <HomeIcon className="w-5 h-5" />
              <span className="text-center text-xs">Home</span>
            </Link>
          </li>{" "}
          <li>
            <Link
              href="/checkout"
              className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-md ${
                path == "/checkout" && "bg-primary text-white"
              }`}>
              <TicketIcon className="w-5 h-5" />
              {cartItems > 0 && <div className={`absolute -top-1 -right-2 rounded-full bg-[#f2f2f2] flex justify-center items-center px-1 shadow-lg ${
                path == "/checkout" && "text-[#ed8b00] bg-[#fff]"
              }`}>
                {cartItems}
            </div>}
              
              <span className="text-center text-xs">Cart</span>
            </Link>
          </li>
          {/* <li>
            <Link
              href="/user-wishlist"
              className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-md ${
                path == "/user-wishlist" && "bg-primary text-white"
              }`}>
              <HeartIcon className="w-5 h-5" />
              <div className="absolute -top-1 -right-2 rounded-full bg-white flex justify-center items-center px-1 shadow-lg">
                0
            </div>
              <span className="text-center text-xs">Wishlist</span>
            </Link>
          </li> */}
          <li>
            <Link
             href="/personal-info"
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-md ${
                path == "/personal-info" && "bg-primary text-white"
              }`}>
              <UserIcon className="w-5 h-5" />
              <span className="text-center text-xs">Profile</span>
            </Link>
          </li>
        </ul>
        <div
          className={`fixed top-0 left-0 h-screen w-full bg-white shadow-lg z-20 transform transition-transform ease-in-out duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <button
            onClick={toggleOffCanvas}
            className="p-3 rounded-full absolute top-1 right-1">
            <XMarkIcon className="w-6 h-6" />
          </button>
          <Image src={logo} className="p-2" alt="logo" />
          <div className="border-b my-2"></div>
          <Navbar />
        </div>
      </header>
    );
  };
  
  export default MobileMenu;
  