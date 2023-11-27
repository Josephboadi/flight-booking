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
    <div className="py-[30px]  lg:py-[40px] bg-[#091E43] px-3 lg:pt-[120px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12 md:col-span-6">
              <h1 className="h2 text-white mb-3"> {heading} </h1>
              
            </div>
            
          </div>
        </div>
      </div>
  );
}

export default Header;
