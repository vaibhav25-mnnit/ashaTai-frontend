import React from "react";
import { ITEMS_PER_PAGE } from "../app/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
function Pagination({ totalItems, page, setPage }) {
  const total_pages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <>
      <div className="flex items-center justify-between rounded bg-white px-4 py-3 sm:px-6 dark:text-white dark:bg-gray-900">
        {/* pagination component for mobile screens */}
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={() => {
              const newPage = page - 1;
              setPage(newPage);
            }}
            className={`cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50  ${
              page === 1 && "invisible"
            } dark:text-white dark:bg-gray-900`}
          >
            Previous
          </div>

          <div
            onClick={() => {
              const newPage = page + 1;
              setPage(newPage);
            }}
            className={`cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50  ${
              page === total_pages && "invisible"
            }`}
          >
            Next
          </div>
        </div>

        {/* pagination component for desktop screens */}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between dark:text-white dark:bg-gray-900">
          <div>
            <p className="text-sm text-gray-700 dark:text-white dark:bg-gray-900">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(totalItems, page * ITEMS_PER_PAGE)}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>

          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {/* Previous icon  */}
              {page !== 1 && (
                <div className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon
                    onClick={() => {
                      const newPage = page - 1;
                      setPage(newPage);
                    }}
                    className="h-5 w-5 cursor-pointer"
                    aria-hidden="true"
                  />
                </div>
              )}
              {/* rendring all the pages */}
              {Array.from({ length: total_pages }).map((el, index) => (
                <div
                  key={index}
                  aria-current="page"
                  onClick={() => {
                    setPage(index + 1);
                  }}
                  className={`cursor-pointer relative z-10 inline-flex items-center ${
                    index + 1 === page
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400"
                  } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>
              ))}
              {page !== total_pages && (
                <div className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon
                    onClick={() => {
                      const newPage = page + 1;
                      setPage(newPage);
                    }}
                    className="cursor-pointer h-5 w-5"
                    aria-hidden="true"
                  />
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
