import React from "react";
import ProductCard from "../../../components/ProductCard";
import { useSelector } from "react-redux";
export default function ProductsByCategory() {
  const products = useSelector((state) => state.products.products);

  return (
    <>
      <div className="flex justify-center items-start border border-rose-200 p-5 mt-5 bg-white shadow min-h-screen">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
