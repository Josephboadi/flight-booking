"use client";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRightOnRectangleIcon,
  } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const Header = () => {
    const path = usePathname();
  const convertToTitleCase = (str) => {
    // Remove leading slash
    str = str.slice(1);

    // Split the string into words
    const words = str.split("-");

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the words with a space
    const result = capitalizedWords.join(" ");

    return result;
  };

  const heading = convertToTitleCase(path);
  return (
    <div className="py-[50px]  lg:py-[60px] bg-[#091E43] px-3 lg:pt-[120px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12 md:col-span-6">
              <h1 className="h2 text-white mb-3"> {heading} </h1>
              <ul className="flex items-center gap-2">
                <li>
                  <Link
                    href="#"
                    className="link inline-block text-white :clr-tertiary-300">
                    booking
                  </Link>
                </li>
                <li>
                  <i className="las text-white la-angle-right"></i>
                </li>
                <li>
                  <Link
                    href="#"
                    className="link inline-block text-[var(--tertiary)]">
                    {heading}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex md:justify-end">
                <Link
                  href="#"
                  className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#243756] hover:bg-primary">
                  <ArrowRightOnRectangleIcon className="w-5 h-5 text-white" />
                  <span className="inline-block text-white font-semibold">
                    Logout
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Header;
