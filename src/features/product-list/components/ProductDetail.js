import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedProduct, resetSelectedProducts } from "../productSlice";
import Navbar from "../../navbar/Navbar";
import {
  addToCart,
  selectCartProducts,
  selectCartStatus,
} from "../../cart/cartSlice";
import { selectUser } from "../../auth/authSlice";
import { STATUS } from "../../../app/constants";
import { toast } from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const dispatch = useDispatch();
  const id = useParams().id;
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const cartProducts = useSelector(selectCartProducts);
  const logedInUser = useSelector(selectUser);
  const status = useSelector(selectCartStatus);

  const [inCart, setIncart] = useState(0);

  useEffect(() => {
    if (id) dispatch(getSelectedProduct(id));

    return () => {
      dispatch(resetSelectedProducts());
    };
  }, [dispatch, id]);

  useEffect(() => {
    searchInCart(id);
  }, [selectedProduct, cartProducts]);

  // function to dynamically change the go to cart button
  const searchInCart = (id) => {
    let found = cartProducts.find((p) => p.product.id === id);
    if (found) setIncart(1);
    else setIncart(0);
  };

  //add the product to cart
  const handleClick = async (product) => {
    // if (status === STATUS.LOADING) return;
    if (logedInUser === null) {
      toast("Please login to add product to cart!", {
        icon: "🛒",
      });
      return;
    }
    await dispatch(
      addToCart({ user: logedInUser._id, quantity: 1, product: product.id })
    );
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="bg-white">
      {selectedProduct ? (
        <Navbar
          title={selectedProduct.title}
          children={
            <>
              <div className="pt-6">
                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={selectedProduct.thumbnail}
                      alt={selectedProduct.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={selectedProduct.thumbnail}
                        alt={selectedProduct.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={selectedProduct.thumbnail}
                        alt={selectedProduct.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img
                      src={selectedProduct.thumbnail}
                      alt={selectedProduct.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {selectedProduct.title}
                    </h1>
                  </div>

                  {/* Options */}
                  <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Product information</h2>

                    {/* Price Section */}
                    <p className="text-3xl tracking-tight text-gray-900">
                      $
                      {Math.round(
                        selectedProduct.price -
                          selectedProduct.price *
                            (selectedProduct.discountPercentage / 100)
                      )}
                    </p>
                    <div className="flex items-center flex space-x-4 ">
                      <p className="text-3xl tracking-tight text-gray-900 line-through">
                        ${selectedProduct.price}
                      </p>
                      <p className="text-3xl tracking-tight text-gray-900">
                        {selectedProduct.discountPercentage}% off
                      </p>
                    </div>

                    {/* Reviews */}
                    <div className="mt-6">
                      <h3 className="sr-only">Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                selectedProduct.rating > rating
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {selectedProduct.rating.average} out of 5 stars
                        </p>
                      </div>
                    </div>

                    {inCart ? (
                      <Link to="/cart">
                        <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          {" "}
                          Go to Cart
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          handleClick(selectedProduct);
                        }}
                        disabled={status === STATUS.LOADING}
                        className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                          status === STATUS.LOADING &&
                          "bg-indigo-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {status === STATUS.LOADING
                          ? "Adding to Cart"
                          : "Add to Cart"}
                      </button>
                    )}
                  </div>

                  <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    {/* Description and details */}
                    <div>
                      <h3 className="sr-only">Description</h3>

                      <div className="space-y-6">
                        <p className="text-base text-gray-900">
                          {selectedProduct.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-10">
                      <h2 className="text-sm font-medium text-gray-900">
                        Details
                      </h2>

                      <div className="mt-4 space-y-6">
                        <p className="text-sm text-gray-600">
                          {selectedProduct.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="flex h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
