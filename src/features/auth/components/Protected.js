import React from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";

function Protected({ component }) {
  const currentuser = useSelector(selectUser);
  console.log(currentuser);
  if (currentuser === null) return <h1>Please,log in</h1>;
  return component;
}

export default Protected;
