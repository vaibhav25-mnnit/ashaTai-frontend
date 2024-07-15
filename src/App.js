import React, { useEffect } from "react";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./features/cart/cartSlice";
import { getUser, selectUser } from "./features/auth/authSlice";

import AOS from "aos";
import "aos/dist/aos.css";
import CartPage from "./pages/CartPage";
import NewCheckout from "./pages/NewCheckout";
import ProductDetailPage from "./features/product-list/components/ProductDetail";
import NotFound from "./pages/NotFound";
import Protected from "./features/auth/components/Protected";
import Navbar from "./features/navbar/Navbar";
import Success from "./components/Success";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import Products from "./features/product-list/components/Products";
import SendResetMail from "./features/resetPassword.js/components/SendResetMail";
import ResetPassword from "./features/resetPassword.js/components/ResetPassword";
import AddProductPage from "./pages/AddProductPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/shop-all",
    element: <Navbar children={<Products />} />,
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
    element: (
      <Protected
        component={
          <Navbar ShowNav={true} title="Checkout" children={<NewCheckout />} />
        }
      />
    ),
    // element: <Protected component={<NewCheckout />}/>
  },
  {
    path: "/product-detail/:id",
    // element: <Protected component={<ProductDetailPage />} />
    element: <ProductDetailPage />,
  },
  {
    path: "/orders",
    element: <Protected component={<OrdersPage />} />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    // element: <Protected component={<Success />} />
  },
  {
    path: "/order-success/:id/:status",
    element: <Success />,
    // element: <Protected component={<Success />} />
  },
  {
    path: "/order-details/:id",
    // element: <Protected component={<OrderDetailsPage />} />
    element: <OrderDetailsPage />,
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

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      if (!logedInUser) dispatch(getUser({ id: userToken }));
    }
  });

  useEffect(() => {
    if (logedInUser) {
      dispatch(getCartItems(logedInUser._id));
    }
  }, [dispatch, logedInUser]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
