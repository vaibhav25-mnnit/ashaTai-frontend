import React from "react";
import Navbar from "../features/navbar/Navbar";

import AddProduct from "../features/product-list/components/AddProduct";
export default function AddProductPage() {
  return <Navbar title="Add New Product" children={<AddProduct />} />;
}
