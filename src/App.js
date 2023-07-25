import React, { useEffect } from 'react';
// import './App.css'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './features/product-list/components/ProductDetail'
import NotFound from './pages/NotFound'
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from './features/cart/cartSlice';
import { selectUser } from './features/auth/authSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected component={<Home />} />,
  }, {
    path: '/login',
    element: <LoginPage />
  }, {
    path: '/signup',
    element: <SignupPage />
  }, {
    path: '/cart',
    element: <Protected component={<CartPage />} />
  }, {
    path: '/checkout',
    element: <Protected component={<Checkout />} />
  }, {
    path: '/product-detail/:id',
    element: <Protected component={<ProductDetailPage />} />
  }, {
    path: '*',
    element: <NotFound />
  }
]);

function App() {

  const dispatch = useDispatch();
  const logedInUser = useSelector(selectUser);


  useEffect(() => {
    if (logedInUser) {
      dispatch(getCartItems(logedInUser.id))
    }
  }, [dispatch, logedInUser])


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
