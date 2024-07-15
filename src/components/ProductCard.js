import React from "react";
import "./styles/ProductCard.css";
import { Link } from "react-router-dom";

const dummyProduct = {
  title: "Apple",
  description:
    "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
  category: "groceries",
  price: 1.99,
  discountPercentage: 1.97,
  rating: 2.96,
  stock: 9,
  thumbnail:
    "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png",
  id: "66605ea496b209d89e60566f",
};
function ProductCard({ product = dummyProduct }) {
  return (
    <div>
      <Link
        to={`/product-detail/${product.id}`}
        className="light-shadow 
                                    h-full  w-auto 
                                    flex flex-col gap-3 items-center justify-center 
                                    overflow-visible 
                                    relative 
                                    rounded-2xl border  
                                    py-4  
                                    transition-transform duration-500 ease-in-out
                                    hover:scale-105
                                    dark:bg-gray-800
                                    dark:border
                                    dark:rounded-2xl
                                    dark:shadow-gray-500
                                    dark:shadow-lg"
      >
        <div className="category-container">
          <img src={product.thumbnail} alt={product.title} className="" />
        </div>
        <h1 className="font-semibold uppercase ">{product.title}</h1>

        <div className="flex justify-between items-center w-full px-5">
          <h3 className="text-sm font-medium  text-gray-900">
            ₹{product.price}
          </h3>
          <h3 className="mt-1 text-sm text-gray-500">{product.rating}⭐</h3>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
