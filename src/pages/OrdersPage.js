import React from "react";
import Orders from "../features/order/components/Orders";
import Navbar from "../features/navbar/Navbar";

export default function OrdersPage() {
  return (
    <>
      <Navbar title="Your Orders" children={<Orders />} />;
    </>
  );
}
