import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../productSlice";
import Pagination from "../../../components/Pagination";
import { STATUS } from "../../../app/constants";
import Loader from "../../../components/Loader";
export default function ProductsByCategory({ category }) {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  console.log(products);
  const [page, setPage] = useState(1);
  const totalProducts = useSelector((state) => state.products.totalProducts);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(
      getProducts({
        filter: [{ section: "category", value: category }],
        page: page,
      })
    );
  }, [page]);

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className=" bg-white shadow-xl flex items-baseline justify-between  px-5  py-5  mt-16  ">
          <h1 className="text-4xl font-semi-bold tracking-tight text-gray-900">
            Explore Our collection of{" "}
            <span className="font-bold 	text-transform: uppercase">
              {category}'s
            </span>
          </h1>
        </div>

        {status === STATUS.LOADING ? (
          <Loader />
        ) : (
          <div className="p-5 mt-2 bg-white shadow grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        )}

        <div className="bg-white shadow-2xl border boremt-5">
          <Pagination
            totalItems={totalProducts}
            page={page}
            setPage={setPage}
          />
        </div>
      </main>
    </>
  );
}
