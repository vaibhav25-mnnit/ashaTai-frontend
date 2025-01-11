import React from "react";
import Navbar from "../features/navbar/Navbar";
import Checkout from "../components/Checkout";

function CheckoutPage() {
  return <Navbar title="Checkout" children={<Checkout />} />;
}

export default CheckoutPage;
