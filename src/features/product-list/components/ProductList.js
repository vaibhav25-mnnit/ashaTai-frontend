import React from "react";
import { useSelector } from "react-redux";
import { STATUS } from "../../../app/constants";
import Loader from "../../../components/Loader";
import ProductCard from "../../../components/ProductCard";

export default function ProductList() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  if (status === STATUS.LOADING || products === undefined) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className=" bg-white shadow-2xl pb-5">
      <div className="mx-auto max-w-2xl w-full   sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
