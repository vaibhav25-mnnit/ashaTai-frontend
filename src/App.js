import React, { useState } from 'react';
import './App.css'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import PageDetailPage from './features/product-list/components/ProductDetail'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, {
    path: '/login',
    element: <LoginPage />
  }, {
    path: '/signup',
    element: <SignupPage />
  }, {
    path: '/cart',
    element: <CartPage />
  }, {
    path: '/checkout',
    element: <Checkout />
  }, {
    path: '/product-detail',
    element: <PageDetailPage />
  }
]);

function App() {
  return (
    <div>

      <RouterProvider router={router} />
    </div>
  )
}

export default App;
