'use client'

import logolight from "@/public/img/new.png";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-[#091E43] mb-[74px] lg:mb-[0px]">
      <div className="py-[60px] lg:py-[90px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-6 xl:gap-10 text-white px-3 xl:px-0">
            <div className="col-span-12 md:col-span-4 xl:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <Image src={logolight} alt="image" className="w-44 md:w-50 xl:w-60" />
              </Link>

              <p className="clr-neutral-30 mb-6 mr-20 sm:mr-4 lg:mr-24 ">
                But very affordable flight tickets from us at the comfort of your home.
              </p>
              
            </div>
            <div className="col-span-12 md:col-span-4 xl:col-span-4">
              <h4 className="text-2xl font-semibold mb-8"> Quick Link </h4>
              <ul className="flex flex-col gap-6">
                <li>
                  <Link
                    href="/help-center"
                    className="hover:text-[var(--secondary)] duration-300">
                    Help Center
                  </Link>
                </li>
                
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-[var(--secondary)] duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-[var(--secondary)] duration-300">
                    Terms & Conditions
                  </Link>
                </li>
                
              </ul>
            </div>
            <div className="col-span-12  md:col-span-4 xl:col-span-4">
              <h4 className="text-2xl font-semibold mb-6"> Contact </h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <div className="flex items-center gap-4">
                    <i className="las la-phone-volume bg-primary text-white text-xl p-2 rounded-full"></i>
                    <Link href="tel:3165550116" className="mb-0 clr-neutral-30">
                      (316) 555-0116
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-4">
                    <i className="las la-envelope-open bg-[var(--secondary)] text-[var(--neutral-700)] text-xl p-2 rounded-full"></i>
                    <Link
                      href="mailto:example@mail.com"
                      className="mb-0 clr-neutral-30">
                      example@mail.com
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-4">
                    <i className="las la-map-marker-alt bg-[var(--tertiary)] text-[var(--neutral-700)] text-xl p-2 rounded-full"></i>
                    <p className="mb-0 clr-neutral-30">
                      31 Brandy Way, Sutton, SM2 6SE
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>

          <div className="w-[100%] flex items-center justify-center mt-8 text-white">
          <ul className="flex gap-3 flex-wrap">
                <li>
                  <Link
                    href="#"
                    className="border border-[#ed8b00] duration-300 hover:bg-[#ed8b00] grid place-content-center p-[10px] rounded-full">
                    <i className="lab la-facebook-f text-xl"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="border border-[#ed8b00] duration-300 hover:bg-[#ed8b00] grid place-content-center p-[10px] rounded-full">
                    <i className="lab la-twitter text-xl"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="border border-[#ed8b00] duration-300 hover:bg-[#ed8b00] grid place-content-center p-[10px] rounded-full">
                    <i className="lab la-linkedin-in text-xl"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="border border-[#ed8b00] duration-300 hover:bg-[#ed8b00] grid place-content-center p-[10px] rounded-full">
                    <i className="lab la-instagram text-xl"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="border border-[#ed8b00] duration-300 hover:bg-[#ed8b00] grid place-content-center p-[10px] rounded-full">
                    <i className="lab la-dribbble text-xl"></i>
                  </Link>
                </li>
              </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-span-12">
            <div className="py-8 border-t border-[#3638bd] text-white">
              <div className="grid grid-cols-12 gap-4 ">
                <div className="col-span-12 lg:col-span-6">
                  <p className="m-0 text-center lg:text-start">
                    Copyright &copy; {new Date().getFullYear()}
                    <span className="text-[var(--tertiary)]"> CalBank All rights reserved.</span>
                   
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

