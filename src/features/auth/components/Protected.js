import React from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";

function Protected({ component }) {
  const currentuser = useSelector(selectUser);

  if (currentuser === null) {
    return (
      <>
        <h1>Unauthorized route access.Please login to access this page</h1>
      </>
    );
  }
  return component;
}

export default Protected;
