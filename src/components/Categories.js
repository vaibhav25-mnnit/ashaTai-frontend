import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/product-list/productSlice";

import CategoryCard from "./CategoryCard";

function Categories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.products.categories);

  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white flex flex-col py-5   items-center shadow-white ">
        <h1 className="text-2xl uppercase font-semibold tracking-tight my-4  sm:my-10 sm:text-4xl">
          SHOP BY CATEGORIES
        </h1>

        <div className="flex overflow-auto sm:grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-5 gap-5 w-[90%] md:1/2 lg:w-2/3 ">
          {categories.map((category) => (
            <CategoryCard data={category} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
