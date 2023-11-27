import {
  DocumentIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Page = () => {
  return (
    <ul className="flex flex-col gap-6">
      
      <li>
        <div className="p-3 sm:p-4 lg:p-6 xl:p-10 rounded-2xl bg-white shadow-lg">
          <h3 className="mb-0 h3"> History </h3>
          <div className="border-t my-6"></div>
          <div className="w-full overflow-x-auto">
            <table className="table w-full table-borderless whitespace-nowrap mb-0">
              <thead className="table-light bg-[var(--primary-light)] font-bold">
                <tr>
                  <th className="px-5 py-4 font-medium"> Reference </th>
                  <th className="px-5 py-4 font-medium"> Status </th>
                  <th className="px-5 py-4 font-medium"> Amount </th>
                  <th className="px-5 py-4 font-medium"> Updated </th>
                  <th className="px-5 py-4 font-medium"> Invoice </th>
                  <th className="px-5 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-4 text-primary">#1544715</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex justify-center text-center rounded py-1 px-2 bg-tertiary-50 clr-tertiary-500 text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="px-5 py-4"> $316 </td>
                  <td className="px-5 py-4"> 22/04/2023 </td>
                  <td className="px-5 py-4">
                    <Link
                      href="#"
                      className="btn-outline-gray-small justify-center flex items-center gap-1 font-medium shrink-0">
                      <DocumentIcon className="w-5 h-5" />

                      <span className="text-sm"> PDF </span>
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href="#"
                      className="btn-outline-gray-small justify-center flex items-center gap-1 font-medium shrink-0">
                      <EyeIcon className="w-5 h-5" />
                      <span className="text-sm"> Quick View </span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-primary">#1544715</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex justify-center text-center rounded py-1 px-2 bg-[var(--primary-light)] text-primary text-xs">
                      Successful
                    </span>
                  </td>
                  <td className="px-5 py-4"> $316 </td>
                  <td className="px-5 py-4"> 22/04/2023 </td>
                  <td className="px-5 py-4">
                    <Link
                      href="#"
                      className="btn-outline-gray-small justify-center flex items-center gap-1 font-medium shrink-0">
                      <DocumentIcon className="w-5 h-5" />
                      <span className="text-sm"> PDF </span>
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href="#"
                      className="btn-outline-gray-small justify-center flex items-center gap-1 font-medium shrink-0">
                      <EyeIcon className="w-5 h-5" />
                      <span className="text-sm"> Quick View </span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-primary">#1544715</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex justify-center text-center rounded py-1 px-2 bg-[var(--primary-light)] text-primary text-xs">
                      Successful
                    </span>
                  </td>
                  <td className="px-5 py-4"> $316 </td>
                  <td className="px-5 py-4"> 22/04/2023 </td>
                  <td className="px-5 py-4">
                    <Link
                      href="#"
                      className="btn-outline-gray-small justify-center flex items-center gap-1 font-medium shrink-0">
                      <DocumentIcon className="w-5 h-5" />
                      <span className="text-sm"> PDF </span>
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href="#"
                      className="btn-outline-gray-small justify-center flex items-center gap-1 font-medium shrink-0">
                      <EyeIcon className="w-5 h-5" />
                      <span className="text-sm"> Quick View </span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Page;
