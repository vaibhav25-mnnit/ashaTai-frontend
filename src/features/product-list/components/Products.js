import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";

import ProductList from "./ProductList";
import {
  sortProducts,
  getProducts,
  getCategories,
  updateFilter,
} from "../productSlice";

import { ITEMS_PER_PAGE } from "../../../app/constants";

const sortOptions = [
  { name: "Best Rating", id: "rating", order: "desc", current: false },
  { name: "Price: Low to High", id: "price", order: "asc", current: false },
  { name: "Price: High to Low", id: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const filters = [
    {
      id: "category",
      name: "Category",
      options: useSelector((state) => state.products.categories),
    },
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState([]);

  const p = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const totalProducts = useSelector((state) => state.products.totalProducts);

  //function to handle the sort functionality
  const sP = (option, order) => {
    let sortedP = [];

    if (order === "asc") {
      if (option === "price") {
        sortedP = p.slice().sort((p1, p2) => {
          if (p1.price > p2.price) return 1;

          if (p1.price < p2.price) return -1;

          return 0;
        });
      }
    }

    if (order === "desc") {
      if (option === "rating") {
        sortedP = p.slice().sort((p1, p2) => {
          if (p1.rating < p2.rating) return 1;

          if (p1.rating > p2.rating) return -1;

          return 0;
        });
      }
      if (option === "price") {
        sortedP = p.slice().sort((p1, p2) => {
          if (p1.price < p2.price) return 1;
          if (p1.price > p2.price) return -1;
          return 0;
        });
      }
    }

    dispatch(sortProducts(sortedP));
  };

  //function to handle the filter functionality
  const handleFilterChange = (e, section, option) => {
    //if the checkbox is checked then add into filter array
    let updatedFilter = [];
    if (e.target.checked) {
      updatedFilter = [...filter, { section: section.id, value: option.value }];
    } else {
      updatedFilter = filter.filter((fil) => fil.value !== option.value);
    }

    dispatch(updateFilter({ id: option._id }));
    setFilter(updatedFilter);
    setPage(1);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts({ filter: filter, page: page }));
  }, [dispatch, filter, page]);

  return (
    <div className="bg-white shadow">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <div
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <div className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                            </div>
                          </h3>
                          <div className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) => {
                                      handleFilterChange(e, section, option);
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      </div>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white shadow">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Browse Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <div
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                sP(option.id, option.order);
                              }}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}

              <form className="hidden lg:block">
                {filters.map((section) => (
                  <div
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <div className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                        </div>
                      </h3>
                      <div className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                style={{
                                  cursor: "pointer",
                                }}
                                id={`filter-desktop-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                onChange={(e) => {
                                  handleFilterChange(e, section, option);
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-desktop-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  </div>
                ))}
              </form>
              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductList />
              </div>
            </div>
          </section>

          {/* Pagination */}
          <Pagination
            totalItems={totalProducts}
            page={page}
            setPage={setPage}
          />
        </main>
      </div>
    </div>
  );
}

//pagination component
function Pagination({ totalItems, page, setPage }) {
  const total_pages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <>
      {/* pagination component for mobile screens */}

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={() => {
              const newPage = page - 1;
              setPage(newPage);
            }}
            className={`cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50  ${
              page === 1 && "invisible"
            } `}
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
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 ">
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
