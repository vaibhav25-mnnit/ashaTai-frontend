import React from 'react'
import Cart from '../features/cart/components/Cart'
import Navbar from '../features/navbar/Navbar'
export default function CartPage() {
    return (
        <Navbar title='Your Cart' children={<Cart />} />
    )
}
