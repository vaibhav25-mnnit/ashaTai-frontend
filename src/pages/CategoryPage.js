import React, { useEffect } from "react";
import Navbar from "../features/navbar/Navbar";
import { useParams } from "react-router-dom";
import ProductsByCategory from "../features/product-list/components/ProductsByCategory";
import { getProducts } from "../features/product-list/productSlice";
import { useDispatch } from "react-redux";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProducts({
        filter: [{ section: "category", value: category }],
        page: 1,
      })
    );
  }, []);

  return <Navbar title={category} children={<ProductsByCategory />} />;
}
