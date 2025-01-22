import React from "react";

import ImageChanger from "./ImageChanger";

function HomePageLoader() {
  return (
    <>
      <div className="dark:bg-black bg-amber-50 grid lg:grid-cols-2 grid-cols-1 h-screen lg:px-24 lg:py-48 px-4 py-24">
        {/*  */}
        <div className="lg:max-w-2xl w-auto lg:pt-20  lg:ml-10">
          <div className="lg:text-start text-center   ">
            <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900 sm:text-6xl">
              Delight Your Palate with Homemade Authenticity.
            </h1>
            <p className="mt-6 text-lg dark:text-white flex justify-center text-gray-600">
              {" "}
              <h1 className="relative w-[max-content] font-mono text-2xl before:absolute before:inset-0 before:animate-typewriter before:bg-white after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-black ">
                Loading ....
              </h1>
            </p>
          </div>
        </div>

        <div className="max-w-2xl flex md:items-center justify-center ">
          <ImageChanger />
        </div>
      </div>
    </>
  );
}

export default HomePageLoader;
