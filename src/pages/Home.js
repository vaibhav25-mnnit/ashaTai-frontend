
import Navbar from '../features/navbar/Navbar.js'
import Products from '../features/product-list/components/Products.js'

export default function Home() {
    return (<>
        <Navbar title={'Products'} children={<Products />} />
    </>

    )
}


