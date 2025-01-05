import { Fragment, useEffect, useState } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { resetUser, selectUser } from "../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, selectCartCount } from "../cart/cartSlice";
import { resetProducts } from "../product-list/productSlice";
import Cart from "../cart/components/Cart";
import logo from "../../images/logo2.png";
import "../../components/styles/navbar.css";
import { resetOrders } from "../order/orderSlice";
import toast from "react-hot-toast";

const navigation = [
  { name: "Shop All", href: "/shop-all" },
  { name: "About Us", href: "#about" },
  { name: "Contact Us", href: "#contact" },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile?tar=Your Profile" },
  { name: "Your Orders", href: "/profile?tar=order" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ ShowNav = false, title, children }) {
  const dispatch = useDispatch();
  const currentuser = useSelector(selectUser);
  const navigate = useNavigate();
  const user = {
    name: currentuser ? currentuser.name : "Guest",
    imageUrl:
      "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1687517843~exp=1687518443~hmac=b69b7d49c6a50eb27b8c1d30ae235136abf29af5734f5c34702e36addbbe0bdf",
    email: currentuser ? currentuser.email : "guest@guest.com",
  };
  const cartCount = useSelector(selectCartCount);
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = (e, item) => {
    if (item.name === "Sign out") {
      localStorage.clear("userToken");
      dispatch(resetProducts());
      dispatch(resetCart());
      dispatch(resetUser());
      dispatch(resetOrders());
      navigate("/");
      toast.success("logged out sccessfully.");
    }
  };

  const [scrollDirection, setScrollDirection] = useState("down");
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setScrollDirection(prevScrollPos > currentScrollPos ? "up" : "down");

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  // Setting theme
  const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //         setTheme('dark');
  //     }
  //     else {
  //         setTheme('light');
  //     }
  // }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Nav bar */}

      {!ShowNav && (
        <>
          <nav
            className={`dark:bg-black dark:text-white bg-gray-800 fixed w-full top-0 z-40`}
          >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Burger button to open the mobile navigation */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden sm:">
                  {/* Mobile menu button*/}
                  <div
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white "
                    onClick={() => setOpen(true)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                {/* logo in center */}
                <div className="flex flex-1 items-center justify-evenly  sm:items-stretch sm:justify-start  ">
                  <Link
                    to="/"
                    className="flex justify-center sm:justify-start items-center "
                  >
                    <img
                      className="h-8 w-[200%]"
                      src={logo}
                      alt="Your Company"
                    />
                  </Link>

                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* extreme right for cart,user profile */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2  ml-0 sm:static sm:inset-auto  sm:pr-0 sm:mr-16">
                  {currentuser && (
                    <>
                      <button
                        type="button"
                        className="relative dark:bg-black rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 z-10"
                        onClick={() => setState(true)}
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Your Cart</span>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                      <span className="inline-flex items-center rounded-md mb-5 -ml-3 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 z-20">
                        {cartCount}
                      </span>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    onClick={(e) => handleClick(e, item)}
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  )}

                  <p className="text-white ml-5 hidden lg:block">
                    Hello, {user.name}
                  </p>

                  {!currentuser && (
                    <>
                      : (
                      <>
                        <div class="flow-root">
                          <Link
                            to="/login"
                            class="-m-2 block p-2 font-medium text-white "
                          >
                            Sign in
                          </Link>
                        </div>
                      </>
                      )
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* theme changer for large screens */}
            <label
              className="switch absolute right-[1rem]  bottom-[1.2rem] xl:right-160 hidden sm:block
                        "
            >
              <input
                type="checkbox"
                checked={theme === "dark" ? false : true}
                onChange={handleThemeSwitch}
              />
              <span className="slider "></span>
            </label>
          </nav>

          <>
            {/* Slide over for cart */}
            <Transition.Root show={state} as={Fragment}>
              <Dialog as="div" className="relative z-50" onClose={setState}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                      <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                      >
                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                          <div className="flex  h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="flex items-start p-4 justify-between">
                              <Dialog.Title className="text-xl font-medium text-gray-900">
                                Your cart
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                  onClick={() => setState(false)}
                                >
                                  <span className="absolute -inset-0.5" />
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>

                            <Cart />
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>

            {/* slideOver for Navigation */}
            <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <Transition.Child
                  className=""
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden ">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                      <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="-translate-x-full"
                        enterTo="-translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="-translate-x-0"
                        leaveTo="-translate-x-full"
                      >
                        <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md bg-gray-800">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <div className="absolute right-0 top-0 -mr-8 flex pl-2 pt-4 sm:-mr-10 sm:pl-4">
                              <button
                                type="button"
                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={() => setOpen(false)}
                              >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </Transition.Child>
                          <div className="flex h-full flex-col overflow-y-scroll bg-gray-800  py-6 shadow-xl">
                            <div className="px-4 sm:px-6 ">
                              <Dialog.Title className="text-base font-semibold leading-6 text-white-900">
                                <div className="flex justify-between items-center px-4">
                                  <img
                                    className="h-8 w-1/2 md:w-auto"
                                    src={logo}
                                    alt="Your Company"
                                  />
                                  <label className="switch ">
                                    <input
                                      type="checkbox"
                                      checked={theme === "dark" ? false : true}
                                      onChange={handleThemeSwitch}
                                    />
                                    <span className="slider "></span>
                                  </label>
                                </div>
                              </Dialog.Title>
                            </div>
                            <div className="relative mt-6 flex-1 px-4 bg-gray-800  sm:px-6">
                              <div className="sm:hidden">
                                <div className="space-y-1  px-2 pb-3 pt-2 ">
                                  {navigation.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={item.href}
                                      className="text-gray-300 hover:bg-gray-700 hover:text-white
                                                        hover:cursor-pointer
                                                    block rounded-md px-3 py-2 text-base font-medium"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </>
        </>
      )}

      {
        <div className="min-h-full ">
          {title && (
            <header className={`${!ShowNav && "mt-16"} bg-white shadow`}>
              <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {title}
                </h1>
              </div>
            </header>
          )}

          {children && <main>{children}</main>}
        </div>
      }
    </>
  );
}
