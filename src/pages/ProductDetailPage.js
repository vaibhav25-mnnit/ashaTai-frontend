import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product-list/components/ProductDetail";

function ProductDetailPage() {
  return <Navbar children={<ProductDetail />} />;
}

export default ProductDetailPage;
