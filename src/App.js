import React, { useEffect } from 'react';
// import './App.css'

//checking if submodule works or not in frontend

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Toaster } from 'react-hot-toast';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import NewCheckout from './pages/NewCheckout';
import ProductDetailPage from './features/product-list/components/ProductDetail'
import NotFound from './pages/NotFound'
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from './features/cart/cartSlice';
import { selectUser } from './features/auth/authSlice';
import Navbar from './features/navbar/Navbar'
import Orders from './features/order/components/Orders';
import Success from './components/Success';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import CashFreePayment from './components/CashFreePayment';
import Products from './features/product-list/components/Products';

import AOS from 'aos';
import 'aos/dist/aos.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
    // element: <Protected component={<Home />} />,
  },
  {
    path: "/shop-all",
    element:   <Products />,
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/cart',
    element: <Protected component={<CartPage />} />
  },
  {
    path: '/checkout',
    element: <Protected component={<Navbar title={"Checkout"} children={<NewCheckout />} />} />
  },
  {
    path: '/product-detail/:id',
    element: <Protected component={<ProductDetailPage />} />
  },
  {
    path: '/orders',
    element: <Protected component={<OrdersPage />} />
  },
  {
    path: '/order-success/:id/:status',
    element: <Success />
    // element: <Protected component={<Success />} />

  },
  {
    path: '/order-details/:id',
    // element: <Protected component={<OrderDetailsPage />} />
    element: <OrderDetailsPage />

  },
  {
    path: '/pay',
    // element: <Protected component={<OrderDetailsPage />} />
    element: <CashFreePayment />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

function App() {

  const dispatch = useDispatch();
  const logedInUser = useSelector(selectUser);

  

  useEffect(() => {
    if (logedInUser) {
      dispatch(getCartItems(logedInUser._id))
    }
  }, [dispatch, logedInUser])

  useEffect(() => {
    AOS.init()
  }, [])


  return (
    <div>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
      />
    </div>
  )
}

export default App;
