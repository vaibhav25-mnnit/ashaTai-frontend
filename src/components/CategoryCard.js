import React from "react";
import "./styles/CategoryCard.css";
import { Link } from "react-router-dom";

// import { getProducts } from "../features/product-list/productSlice";
//{ thumbnail, value, label }
function CategoryCard({ data }) {
  return (
    <div data-aos="zoom-in" data-aos-duration="1000">
      <Link
        to={`/category/${data.value}`}
        className="
        light-shadow 
        h-full  w-auto 
        flex flex-col gap-3 items-center justify-center 
        overflow-visible 
        relative 
        rounded-2xl border  
        py-4  
        transition-transform duration-500 ease-in-outs
        hover:scale-105
        dark:bg-gray-800
        dark:border
        dark:rounded-2xl
        dark:shadow-gray-500
        dark:shadow-lg
        "
      >
        <div className="category-container">
          <img
            alt={data.value}
            src={data.thumbnail}
            className="category-image"
          />
        </div>
        <h1 className="font-semibold uppercase ">{data.label}</h1>
      </Link>
    </div>
  );
}

export default CategoryCard;
