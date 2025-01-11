import React from "react";
import "./styles/loader.css";

export default function Loader() {
  return (
    <>
      <div className="flex justify-center min-h-screen items-center">
        <div class="custom-loader"></div>
      </div>
    </>
  );
}
