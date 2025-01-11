import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { STATUS } from "../../../app/constants";
import { addProductAsync } from "../productSlice";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getCategories } from "../productSlice";
import { storage } from "../../firebase/setup";
export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const status = useSelector((state) => state.products.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [up, setUp] = useState(null);
  const categories = useSelector((state) => state.products.categories);
  const [tags, setTags] = useState([]);

  const onSubmit = async (data) => {
    data.tags = tags;
    console.log(data);

    const storageRef = ref(storage, `/products/${data.title}`);
    const uploadTask = uploadBytesResumable(storageRef, data.thumbnail[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        data.thumbnail = downloadURL;
        dispatch(addProductAsync(data));
        toast.success("Added product");
        navigate("/");
        console.log("File available at", downloadURL);
        return downloadURL;
      }
    );
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddTag = () => {
    const newTag = document.getElementById("tag").value;
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      document.getElementById("tag").value = "";
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="bg-white shadow p-4 sm:mx-auto sm:w-2/3  ">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  {...register("title", {
                    required: "Title is required",
                    maxLength: {
                      value: 20,
                      message: "Title should be less than 20 length.",
                    },
                  })}
                  id="title"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>

            {/* Product Description */}
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Description
              </label>
              <div className="mt-2">
                <textarea
                  {...register("description", {
                    required: "Product Description is required.",

                    minLength: {
                      value: 100,
                      message: "Description should be of minimum 100 words.",
                    },
                  })}
                  rows="4"
                  name="description"
                  id="description"
                  className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>

              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* category */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    name="category"
                    id="category"
                    className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("category", {
                      required: "Product Description is required.",
                    })}
                  >
                    {categories.map((category) => (
                      <option value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* stock */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  stock
                </label>
                <div className="mt-2 ">
                  <input
                    {...register("stock", {
                      required: "stock is required",
                      min: {
                        value: 1,
                        message: "invalid stock",
                      },
                    })}
                    type="number"
                    name="stock"
                    id="stock"
                    className="block w-full   rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="123"
                  />
                </div>
                {errors.stock && (
                  <span className="text-red-500">{errors.stock.message}</span>
                )}
              </div>

              {/* price */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2  relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-800 sm:text-md">₹</span>
                  </div>
                  <input
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 1,
                        message: "invalid price",
                      },
                      max: {
                        value: 100000,
                        message: "invalid price",
                      },
                    })}
                    type="number"
                    name="price"
                    id="price"
                    step="any"
                    className="block w-full rounded-md border-0 py-1.5 pl-7   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="999"
                  />
                </div>
                {errors.price && (
                  <span className="text-red-500">{errors.price.message}</span>
                )}
              </div>

              {/* discountPercentage */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2  relative mt-2 rounded-md shadow-sm">
                  <input
                    {...register("discountPercentage", {
                      required: " Discount Percentage is required",
                      min: {
                        value: 1,
                        message: "invalid discount",
                      },
                      max: {
                        value: 99,
                        message: "invalid discount",
                      },
                    })}
                    type="number"
                    name="discountPercentage"
                    id="discountPercentage"
                    className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="99"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-4    flex items-center pl-3">
                    <span className="text-gray-800 sm:text-md">%</span>
                  </div>
                </div>
                {errors.discountPercentage && (
                  <span className="text-red-500">
                    {errors.discountPercentage.message}
                  </span>
                )}
              </div>
              {/* tags */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Add tag
                </label>
                <div className="mt-2 flex">
                  <input
                    id="tag"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
                    onClick={handleAddTag}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Display current tags */}
              <div className="mt-4">
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="text-gray-900 dark:text-white">{tag}</span>
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 bg-red-600 text-white rounded-md"
                      onClick={() => handleRemoveTag(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* thumbnail */}
            <div className="col-span-full">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              {img && <img src={img} alt="Preview" className="mt-2" />}
              <div
                className={`mt-2 flex justify-center rounded-lg   ${
                  img
                    ? "px-5 py-0"
                    : "px-5 py-10 border border-dashed border-gray-900/25"
                } `}
              >
                <div className="text-center">
                  {!img && (
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="thumbnail"
                      className={`relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500`}
                    >
                      <span>{`${img ? "change" : "upload"} a photo`}</span>
                      <input
                        {...register("thumbnail", {
                          required: " Thumbnail is required",
                        })}
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageInput}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {errors.thumbnail && (
                <span className="text-red-500">{errors.thumbnail.message}</span>
              )}
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className={`flex w-full    justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ${
                  status === STATUS.LOADING &&
                  "bg-indigo-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                } `}
              >
                {status === STATUS.LOADING ? "Adding Product" : "Add Product"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              to="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Go To Dashboard
            </Link>
          </p>
        </div>

        {up && <img src={up} />}
      </div>
    </>
  );
}
