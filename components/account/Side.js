'use client'

import Image from "next/image";
import Link from "next/link";
import {
  AdjustmentsHorizontalIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  HeartIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const Side = ({ route, toggle, toggleSidbar, toggleSide }) => {
  const path = usePathname();


  return (
    <div
              style={{ zIndex: 2 }}
              className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3">
              <div className="p-3 sm:p-4 lg:p-6 rounded-2xl bg-white shadow-lg">
                <div className="w-32 h-32 border border-[var(--primary)] rounded-full bg-white p-4 grid place-content-center relative mx-auto mb-10">
                  <Image
                    width={96}
                    height={96}
                    src="/img/team-1.jpg"
                    alt="image"
                    className="rounded-full"
                  />
                  <div className="w-8 h-8 grid place-content-center rounded-full border-2 white text-white bg-primary absolute bottom-0 right-0">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-center mb-10">
                  <h4 className="text-2xl font-semibold"> Savannah Nguyen </h4>
                  <p className="mb-0"> info@example.com </p>
                </div>
                <div className="mb-10">
                  <span className="block clr-neutral-400 text-xs mb-4">
                    ACCOUNT
                  </span>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <Link
                        href="/personal-info"
                        className={`link flex items-center gap-2 clr-neutral-500 hover:text-primary ${
                          path === "/personal-info" && "text-primary"
                        }`}>
                        <i className="las la-user-circle text-xl"></i>
                        <span className="block font-medium">Personal info</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user-security"
                        className={`link flex items-center gap-2 clr-neutral-500 hover:text-primary ${
                          path === "/user-security" && "text-primary"
                        }`}>
                        <ShieldCheckIcon className="w-5 h-5" />
                        <span className="block font-medium"> Security </span>
                      </Link>
                      </li>
                  </ul>
                </div>
                <div className="mb-10">
                  <span className="block clr-neutral-400 text-xs mb-4">
                    HISTORY
                  </span>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <Link
                        href="/user-booking"
                        className={`link flex items-center gap-2 clr-neutral-500 hover:text-primary ${
                          path === "/user-booking" && "text-primary"
                        }`}>
                        <ClipboardDocumentCheckIcon className="w-5 h-5" />
                        <span className="block font-medium"> My Bookings </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user-payment"
                        className={`link flex items-center gap-2 clr-neutral-500 hover:text-primary ${
                          path === "/user-payment" && "text-primary"
                        }`}>
                        <CreditCardIcon className="w-5 h-5" />
                        <span className="block font-medium"> Payments </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
  );
};

export default Side;
