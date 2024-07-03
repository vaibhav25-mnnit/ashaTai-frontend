import React from "react";
import Cart from "../features/cart/components/Cart";
import Navbar from "../features/navbar/Navbar";
export default function CartPage() {
  return <Navbar ShowNav={true} title="Your Cart" children={<Cart />} />;
}
