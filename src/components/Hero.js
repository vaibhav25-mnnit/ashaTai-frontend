import React from "react";

import { Link } from "react-router-dom";
import ImageChanger from "./ImageChanger";

function Hero() {
  return (
    <>
      <div className="dark:bg-black bg-amber-50 grid lg:grid-cols-2 grid-cols-1 min-h-screen lg:px-24 lg:py-48 px-4 py-24">
        {/*  */}
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="lg:max-w-2xl w-auto lg:pt-20  lg:ml-10"
        >
          <div className="lg:text-start text-center   ">
            <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900 sm:text-6xl">
              Delight Your Palate with Homemade Authenticity.
            </h1>
            <p className="mt-6 text-lg dark:text-white leading-8 text-gray-600">
              {" "}
              Experience and Discover the convenience and joy of having
              homemade, authentic food at your fingertips.{" "}
            </p>

            <div className="mt-6 flex items-center justify-center ">
              <Link to="/shop-all">
                <span className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Shop All
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          className="max-w-2xl flex md:items-center justify-center "
        >
          <ImageChanger />
        </div>
      </div>
    </>
  );
}

export default Hero;
