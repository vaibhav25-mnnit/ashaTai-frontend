import React from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAuthStatus,
  selectUser,
  updateUser,
} from "../features/auth/authSlice";
import { STATUS } from "../app/constants";

function AddressInputFrom({ Cancel }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const authStatus = useSelector(selectAuthStatus);
  const onSubmit = async (data) => {
    console.log(data);
    await dispatch(
      updateUser({ user: currentUser._id, add: "true", address: data })
    );
    toast.success("Successfully Updated delivery address.");
    Cancel();
  };

  return (
    <>
      {authStatus === STATUS.LOADING ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white px-5 py-5"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Full Name */}
            <div className="col-span-full">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.fullName && (
                <span className="text-red-500">{errors.fullName.message}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="col-span-full">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    maxLength: {
                      value: 10,
                      message: "Please Enter Valid Phone Number.",
                    },
                    pattern: {
                      value: /(\+)?(91)?( )?[789]\d{9}/,
                      message: "Please Enter Valid Phone Number.",
                    },
                  })}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="col-span-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                      message: "Email is not Valid",
                    },
                  })}
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Street-address */}
            <div className="col-span-full">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Complete Address
              </label>
              <div className="mt-2">
                <textarea
                  {...register("streetAddress", {
                    required: "Street Address is required.",
                  })}
                  rows="4"
                  name="streetAddress"
                  id="streetAddress"
                  className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>

              {errors.streetAddress && (
                <span className="text-red-500">
                  {errors.streetAddress.message}
                </span>
              )}
            </div>

            {/* City */}
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  {...register("city", {
                    required: "City is required",
                  })}
                  type="text"
                  name="city"
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
            </div>

            {/* State */}
            <div className="sm:col-span-2">
              <label
                htmlFor="state"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  {...register("state", {
                    required: "State is required.",
                  })}
                  type="text"
                  name="state"
                  id="state"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.state && (
                <span className="text-red-500">{errors.state.message}</span>
              )}
            </div>

            {/* Pin Code */}
            <div className="sm:col-span-2">
              <label
                htmlFor="pinCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Postal code
              </label>
              <div className="mt-2">
                <input
                  {...register("pinCode", {
                    required: "Postal Code is required",
                    pattern: {
                      value: /([1-9][0-9]{5}|[1-9][0-9]{2}[\s]\d{3})/gi,
                      message: "Enter Valid Postal Code",
                    },
                  })}
                  type="text"
                  name="pinCode"
                  id="pinCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {errors.pinCode && (
                <span className="text-red-500">{errors.pinCode.message}</span>
              )}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => reset()}
            >
              Reset
            </button>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save & Deliver Here
            </button>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                Cancel();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default AddressInputFrom;
