import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrdersAsync,
  selectOrders,
  updateOrderFilter,
  selectTotalOrders,
  selectOrdersFilter,
  selectOrderStatus,
} from "../orderSlice";
import { selectUser } from "../../auth/authSlice";
import Pagination from "../../../components/Pagination";
import { STATUS } from "../../../app/constants";
import Loader from "../../../components/Loader";

function Orders() {
  const dispatch = useDispatch();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(1);

  const user = useSelector(selectUser);
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const filters = useSelector(selectOrdersFilter);
  const status = useSelector(selectOrderStatus);
  const handleFilterChange = (e, section, option) => {
    //if the checkbox is checked then add into filter array
    let updatedFilter = [];
    if (e.target.checked) {
      updatedFilter = [...filter, { section: section.id, value: option.value }];
    } else {
      updatedFilter = filter.filter((fil) => fil.value !== option.value);
    }

    dispatch(updateOrderFilter({ section: section.id, value: option.value }));
    setFilter(updatedFilter);
    setPage(1);
  };

  useEffect(() => {
    if (user)
      dispatch(getOrdersAsync({ filter: filter, page: page, id: user._id }));
  }, [dispatch, filter, page, user]);

  return (
    <div className="h-full mt-4 overflow-y-scroll  overflow-x-hidden lg:overflow-y-hidden">
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
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
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
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto max-w-7xl lg:pr-0">
        <section
          aria-labelledby="products-heading"
          className=" flex h-full  relative justify-start lg:justify-between px-4"
        >
          {/*TODO:update the position of funnel icon for mobile only filter button */}
          <div className="lg:hidden fixed bottom-20 right-16">
            <div>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FunnelIcon className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* <div className="grid-cols-1"> */}
          {/* Big screen Filters */}
          <div className="w-1/4 hidden lg:h-[32rem] bg-white shadow lg:block mr-5">
            <div className="lg:col-span-1  px-5 py-2 ">
              <div className="flex w-full items-center justify-between bg-white py-3 text-2xl text-gray-400 hover:text-gray-500">
                <h1 className="font-medium text-gray-900">Filters</h1>
              </div>
              <hr />
              {filters.map((section) => (
                <div
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-4"
                >
                  <>
                    <h3 className="-my-3 flow-root">
                      <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                      </div>
                    </h3>

                    <div className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}`}
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={option.checked}
                              onChange={(e) => {
                                handleFilterChange(e, section, option);
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
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
            </div>
          </div>

          {/* Orders grid */}
          <div className="w-full h-full lg:h-[32rem] mb-2 lg:mb-5 lg:pr-3  overflow-x-hidden">
            {status === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ul className="divide-y divide-grey-500  ">
                {orders?.length <= 0 && <h1>You don't have any orders</h1>}

                {orders?.map((order) => (
                  <>
                    <Link to={`/order-details/${order.id}`}>
                      <li
                        key={order.id}
                        className="flex justify-between rounded-2xl items-center mb-2 p-3 bg-white shadow border border-[#dbdbdb] hover:shadow-lg hover:pointer-cursor "
                      >
                        {/* Show first item + plus how many are there in this order */}
                        <div>
                          <div className="flex min-w-0 gap-x-4">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                              <img
                                src={order.items[0].product.thumbnail}
                                alt={order.items[0].product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-5">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {order.items[0].product.title}
                              </p>
                              {order.items.length > 1 && (
                                <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                                  + {order.items.length - 1}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Show total Price here */}
                        <div>
                          <div className="">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              ₹ {order.priceDetails.toPay}
                            </p>
                          </div>
                        </div>

                        {/* Show order status here */}
                        <div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {order.status}
                            </p>

                            {/* <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                            </p>
                                       */}
                          </div>
                        </div>
                      </li>
                    </Link>
                  </>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/*  Pagination */}
        {orders?.length > 0 && (
          <div className="mx-4">
            <Pagination
              totalItems={totalOrders}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default Orders;
