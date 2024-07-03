import React from "react";

import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link key={product.id} to={`/product-detail/${product.id}`}>
      <div className="group relative border border-sky-500">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link to={`/product-detail/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
    </Link>
  );
}
