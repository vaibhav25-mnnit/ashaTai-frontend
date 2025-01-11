// import Navbar from "../features/navbar/Navbar.js";
// import Products from '../features/product-list/components/Products.js'
import Hero from "./Hero.js";
import Categories from "./Categories.js";
import ProductsSections from "./ProductsSections.js";
import About from "./About.js";
import Footer from "./Footer.js";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <ProductsSections tittle={"our best sellers"} tag={"best"} />
      <ProductsSections tittle={"New on Menu"} tag={"new"} />
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
}
