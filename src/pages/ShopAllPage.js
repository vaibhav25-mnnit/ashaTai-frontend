import React from "react";
import Navbar from "../features/navbar/Navbar";
import Products from "../features/product-list/components/Products";

function ShopAllPage() {
  return <Navbar children={<Products />} />;
}

export default ShopAllPage;
