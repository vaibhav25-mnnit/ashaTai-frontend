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
      <div className="bg-white  dark:bg-gray-900 dark:text-white flex py-4 flex-col items-center shadow-white ">
        <hr className="border-gray-200  sm:mx-auto dark:border-gray-700 " />
        <h1 className="text-2xl uppercase font-semibold tracking-tight my-4  sm:my-10 sm:text-4xl">
          {tittle}
        </h1>
        {/* <div className="flex w-full gap-x-3 p-4 overflow-x-auto"></div> */}
        <div className="flex overflow-auto p-5 gap-5 w-[90%] md:1/2 lg:w-2/3 ">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
    </>
  );
}

export default ProductsSections;
