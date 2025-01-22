import React, { useEffect, useState } from "react";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./features/cart/cartSlice";
import { getUser, selectUser } from "./features/auth/authSlice";

import AOS from "aos";
import "aos/dist/aos.css";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import Success from "./components/Success";
import OrdersPage from "./pages/OrdersPage";
import ShopAllPage from "./pages/ShopAllPage";
import ProfilePage from "./pages/ProfilePage";
import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddProductPage from "./pages/AddProductPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import Protected from "./features/auth/components/Protected";
import { selectTheme } from "./features/themeManager/themeSlice";
import SendResetMail from "./features/resetPassword.js/components/SendResetMail";
import ProductDetailPage from "./features/product-list/components/ProductDetail";
import ResetPassword from "./features/resetPassword.js/components/ResetPassword";
import { STATUS } from "./app/constants";
import HomePageLoader from "./components/HomePageLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/shop-all",
    element: <ShopAllPage />,
  },
  {
    path: "/category/:category",
    element: <CategoryPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/send-reset-mail",
    element: <SendResetMail />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected component={<CartPage />} />,
  },
  {
    path: "/checkout",
    element: <Protected component={<CheckoutPage />} />,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/orders",
    element: <Protected component={<OrdersPage />} />,
  },
  {
    path: "/profile",
    element: <Protected component={<ProfilePage />} />,
  },
  {
    path: "/order-success/:id/:status",
    element: <Protected component={<Success />} />,
  },
  {
    path: "/order-details/:id",
    element: <Protected component={<OrderDetailsPage />} />,
  },
  {
    path: "/add-product",
    element: <AddProductPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const logedInUser = useSelector(selectUser);
  const theme = useSelector(selectTheme);
  const [status, setState] = useState(STATUS.IDEAL);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      if (!logedInUser) dispatch(getUser({ id: userToken }));
    }
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (logedInUser) {
      dispatch(getCartItems(logedInUser._id));
    }
  }, [dispatch, logedInUser]);

  useEffect(() => {
    setState(STATUS.LOADING);
    serverCheck();
  }, []);

  async function serverCheck() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`);
    console.log(response.status);

    if (response.status === 200) {
      setState(STATUS.IDEAL);
    } else {
      setState(STATUS.ERROR);
    }
  }

  useEffect(() => {
    if (status === STATUS.ERROR) {
      console.log("server is down");
      alert("server is down");
    }
  }, [status]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {status === STATUS.LOADING ? (
        <HomePageLoader />
      ) : (
        <>
          <div className="dark:bg-gray-800  dark:text-white">
            <RouterProvider router={router} />
            <Toaster position="bottom-right" />
          </div>
        </>
      )}
    </>
  );
}

export default App;
