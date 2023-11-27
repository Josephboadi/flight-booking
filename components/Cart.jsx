import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react"

export default function Cart() {
  const  [cartItems, setCartItems] = useState(0)
  return (
    <div className="text-left z-10">
      
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Link href="/checkout" className="relative inline-flex justify-center rounded-3xl  p-3 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <CartIcon />
            {/* <HeartIcon className="w-6 h-6 text-red-500" /> */}
            <div className="absolute -top-1 -right-2  rounded-full bg-white flex justify-center items-center px-1 shadow-lg">
                2
            </div>

          </Link>
        </div>
        {/* <Transition
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute left-[-130px] lg:right-0 lg:left-auto mt-2 p-2 w-72 md:w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <h5 className="text-xl font-semibold text-[var(--neutral-700)] mb-1">
                Notifications
              </h5>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-gray-100 text-gray-600" : "text-gray-800"
                    } group flex gap-3 w-full items-center rounded-md px-2 py-2 cursor-pointer`}>
                    <Image
                      src="/img/user-2.jpg"
                      alt="img"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium leading-6 text-lg text-gray-800">
                        Peter Parker
                      </span>
                      <span className="text-sm text-gray-500 leading-5">
                        New Message alert! @trending{" "}
                      </span>
                      <span className="text-xs text-gray-400">6 Sec ago</span>
                    </div>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-gray-100 text-gray-600" : "text-gray-800"
                    } group flex gap-3 w-full items-center rounded-md px-2 py-2 cursor-pointer`}>
                    <Image
                      src="/img/user-3.jpg"
                      alt="img"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium leading-6 text-lg text-gray-800">
                        Gal Gadot
                      </span>
                      <span className="text-sm text-gray-500 leading-5">
                        Measure actions your users{" "}
                      </span>
                      <span className="text-xs text-gray-400">4 Min ago</span>
                    </div>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-gray-100 text-gray-600" : "text-gray-800"
                    } group flex gap-3 w-full items-center rounded-md px-2 py-2 cursor-pointer`}>
                    <Image
                      src="/img/user-4.jpg"
                      alt="img"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium leading-6 text-lg text-gray-800">
                        Eva green
                      </span>
                      <span className="text-sm text-gray-500 leading-5">
                        New Message alert! @trending{" "}
                      </span>
                      <span className="text-xs text-gray-400">15 Min ago</span>
                    </div>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition> */}
      </Menu>
    </div>
  );
}

const CartIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
</svg>
  );
};


