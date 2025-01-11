import React from "react";
import Navbar from "../features/navbar/Navbar";
import { useParams } from "react-router-dom";
import ProductsByCategory from "../features/product-list/components/ProductsByCategory";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;

  return <Navbar children={<ProductsByCategory category={category} />} />;
}
