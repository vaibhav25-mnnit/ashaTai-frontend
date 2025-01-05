// import Navbar from "../features/navbar/Navbar.js";
// import Products from '../features/product-list/components/Products.js'
import Hero from "../components/Hero.js";
import Categories from "../components/Categories.js";
import ProductsSections from "../components/ProductsSections.js";
import About from "../components/About.js";
import Footer from "../components/Footer.js";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <ProductsSections tittle={"our best sellers"} />
      <ProductsSections tittle={"on huge discounts"} />
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
}
