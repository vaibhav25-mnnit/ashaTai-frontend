import React, { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import Loader from "./Loader";
function ProductsSections({ tittle, tag }) {
  const [products, setProducts] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const getSectionProducts = async (tag) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/all?tag=${tag}`
    );
    const d = await res.json();
    setProducts(d);
    setShowLoading(false);
  };
  useEffect(() => {
    getSectionProducts(tag);
  }, []);
  return (
    <>
      <div className="bg-white flex py-4 flex-col items-center shadow-white dark:bg-zinc-950 dark:text-white">
        <hr className="border-gray-200 sm:mx-auto" />
        <h1 className="text-2xl uppercase font-semibold tracking-tight my-4  sm:my-10 sm:text-4xl">
          {tittle}
        </h1>
        {/* <div className="flex w-full gap-x-3 p-4 overflow-x-auto"></div> */}
        {showLoading === true ? (
          <Loader />
        ) : (
          <>
            <div className="flex overflow-auto justify-center p-5 gap-5 w-[90%] md:1/2 lg:w-2/3 ">
              {products.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
    </>
  );
}

export default ProductsSections;
