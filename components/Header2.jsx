"use client";
import { useEffect, useState } from "react";
// import LangDropdown from "../LangDropdown";
// import NotificationDropdown from "../NotificationDropdown";
import Cart from "./Cart";
import ProfileDropdown from "./ProfileDropdown";
import Image from "next/image";
import logo from "@/public/img/new.png";
import Navbar from "./Navbar";
import Link from "next/link";
import WhishList from "./WhishList";

const Header2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);
  return (
    <header
      className={`z-30 hidden lg:block fixed ${
        scrolled ? "z-50 shadow-md bg-[#091E43]" : "bg-transparent"
      } duration-300 w-full`}>
      <div className="container flex justify-between items-center relative px-3 py-2 lg:py-3 lg:px-0">
        <Link href="/" className="hidden lg:block">
          <Image src={logo} alt="logo" className="h-12 w-40" />
        </Link>
        <div className="lg:order-2 flex gap-8 items-center">
          {/* <LangDropdown /> */}
          <div className="mt-3">
          <Cart />
          </div>
          
          {/* <WhishList/> */}
          
          <ProfileDropdown />
          
        </div>

        {/* <div className="lg:order-1">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden border py-1 px-2 rounded-md bg-[var(--btn-bg)]">
            <i className="las la-bars text-2xl"></i>
          </button>
          <div
            className={`lg:block ${menuOpen ? "block" : "hidden"} text-white`}>
            <Navbar />
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Header2;
