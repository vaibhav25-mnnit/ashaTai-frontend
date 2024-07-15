import React from "react";
import Orders from "../features/order/components/Orders";
import Navbar from "../features/navbar/Navbar";

export default function OrdersPage() {
  return (
    <>
      <Navbar ShowNav={false} title="Your Orders" children={<Orders />} />;
    </>
  );
}
