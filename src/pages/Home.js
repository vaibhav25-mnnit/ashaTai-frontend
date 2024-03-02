
import Navbar from '../features/navbar/Navbar.js'
// import Products from '../features/product-list/components/Products.js'
import Hero from '../components/Hero.js'
import Categories from '../components/Categories.js'
import ProductsSections from '../components/ProductsSections.js'

export default function Home() {

    return (<>
        <Navbar />
        <Hero />
        <Categories />

        <hr />
        <ProductsSections tittle={'our best sellers'} />
        <hr />
        <ProductsSections tittle={'on huge discounts'} />
        <hr />
        <div id='about'>
            About Section
        </div>
        <div id='contact'>
            Contact Section
        </div>




    </>
    )
}



