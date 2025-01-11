import React from "react";
import { useSearchParams } from "react-router-dom";

import Profile from "../components/Profile";
import Navbar from "../features/navbar/Navbar";
import Orders from "../features/order/components/Orders";
import Cart from "../features/cart/components/Cart";

function ProfilePage() {
  const [parm, setParam] = useSearchParams();
  const target = parm.get("tar");

  return (
    <Navbar
      title={target}
      children=<ComponentPicker className="h-full " target={target} />
    />
  );
}
function ComponentPicker({ target }) {
  switch (target) {
    case "order":
      return <Orders />;
    case "cart":
      return <Cart />;
    default:
      return <Profile />;
  }
}

export default ProfilePage;
