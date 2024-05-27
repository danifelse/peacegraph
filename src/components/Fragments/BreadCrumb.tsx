import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { TiHome } from "react-icons/ti";

export default function BreadCrumb({ links }: { links: Array<string> }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <TiHome className="w-4 h-4 me-2" />
            Home
          </Link>
        </li>
        {links.map((link, index) => (
          <li key={index}>
            <div className="flex items-center">
              <IoIosArrowForward />
              <p
                // href={`/${link.toLocaleLowerCase().replace(/ /g, "-")}`}
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                {link}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
