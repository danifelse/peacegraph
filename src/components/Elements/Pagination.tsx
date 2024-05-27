import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function Pagination({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  let startPage, endPage;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (page <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (page + 1 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = page - 2;
      endPage = page + 2;
    }
  }

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const firstPage = () => {
    setPage(1);
  };

  const lastPage = () => {
    setPage(totalPages);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <a
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              totalPages <= 5 && "hidden"
            }`}
            onClick={() => firstPage()}
          >
            <span className="sr-only">First Page</span>
            <MdKeyboardDoubleArrowLeft />
          </a>
        </li>
        <li>
          <a
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-blue-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => previousPage()}
          >
            <span className="sr-only">Previous</span>
            <MdKeyboardArrowLeft />
          </a>
        </li>
        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
          <li key={pageNumber} className="cursor-pointer">
            <a
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-blue-300 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                page === pageNumber
                  ? "bg-blue-300 text-pink-400 font-bold"
                  : "bg-white "
              }`}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 g hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => nextPage()}
          >
            <span className="sr-only">Next</span>
            <MdKeyboardArrowRight />
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              totalPages <= 5 && "hidden"
            }`}
          >
            <span className="sr-only">Last page </span>
            <MdKeyboardDoubleArrowRight />
          </a>
        </li>
      </ul>
    </nav>
  );
}
