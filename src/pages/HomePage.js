import React from "react";
import Navbar from "../features/navbar/Navbar";
import Home from "../components/Home";

function HomePage() {
  return <Navbar children={<Home />} />;
}

export default HomePage;
