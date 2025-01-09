import React, { useState } from "react";
import Navbar from "../features/navbar/Navbar";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import AddProduct from "../features/product-list/components/AddProduct";

export default function AddProductPage() {
  const [isadmin, setIsadmin] = useState(false);

  return (
    <>
      {isadmin ? (
        <Navbar title="Add New Product" children={<AddProduct />} />
      ) : (
        <EnterAdminPassword setIsadmin={setIsadmin} />
      )}
    </>
  );
}

function EnterAdminPassword({ setIsadmin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password === process.env.REACT_APP_ADD_PRODUCT_PASSWORD) {
      toast.success("Welcome Admin");
      setIsadmin(true);
    } else {
      toast.error("Wrong Password.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 `}
          >
            Enter Admin passwords
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
              >
                Verify
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a Admin?{" "}
            <Link
              to="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Shop With Us
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
