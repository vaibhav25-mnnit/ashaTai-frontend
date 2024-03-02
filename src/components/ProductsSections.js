import React, { useRef } from "react";

import ProductCard from "./ProductCard";
function ProductsSections({ tittle }) {
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 100; // Adjust the scroll distance as needed
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 100; // Adjust the scroll distance as needed
    }
  };
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white flex flex-col py-5   items-center shadow-white ">
        <h1 className="text-2xl uppercase font-semibold tracking-tight my-4  sm:my-10 sm:text-4xl">
          {tittle}
        </h1>
        <div className="flex w-full gap-x-3 p-4 overflow-x-auto">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />

          <ProductCard />

          <ProductCard />

          <ProductCard />

          <ProductCard />

          <ProductCard />

          <ProductCard />

          <ProductCard />

          <ProductCard />

          <ProductCard />
        </div>
      </div>
    </>
  );
}

export default ProductsSections;
