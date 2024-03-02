import React, { useState } from 'react'
import './style.css'

import { useDispatch, useSelector } from 'react-redux'

import { selectCartProducts, selectCartStatus, updateCart, deleteItem } from '../features/cart/cartSlice'

import { toast } from 'react-hot-toast'

import { STATUS } from '../app/constants'

import { Link, Navigate } from 'react-router-dom'
import { selectUser } from '../features/auth/authSlice'
function ProductDetailNew() {

    const dispatch = useDispatch()

    const Products = useSelector(selectCartProducts)
    const status = useSelector(selectCartStatus)
    const user = useSelector(selectUser)
    let total = 0;

    const [changeAddress, setChangeAddress] = useState(false)
    const [changeLogin, setChangeLogin] = useState(false)

    const changeQuantity = (e, product) => {
        dispatch(updateCart({ ...product, quantity: +e.target.value }))
    }

    const handleDelete = async (product) => {
        await dispatch(deleteItem(product))
        toast.success(`successfully removed ${product.title} from cart.`)
    }
    return (
        <>
            {Products.length <= 0 && <Navigate to='/' />}

            <div className='main'>
                {/* <div className='upper-main'> */}
                <div className='grid grid-cols-6 gap-4 px-20' style={{
                    'padding': '0 8rem'
                }}>
                    {/* <div className='left'> */}
                    <div className='col-span-6 lg:col-span-4'>
                        <div className='left-child bg-white shadow'>
                            <h1>Login Details ✔</h1>
                            <div className='inner-address'>
                                <div>
                                    {user.name}
                                    <br />
                                    {user.email}
                                </div>
                                <div>
                                    <button onClick={() => {
                                        if (changeLogin === false) {
                                            setChangeLogin(true)
                                        } else {
                                            setChangeLogin(false)
                                        }
                                    }} className=" rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" > Change</button>
                                </div>
                            </div>
                        </div>

                        <br></br>


                        <div className='left-child bg-white shadow' id='delivey-address'>
                            <h1 className={`${changeAddress && ''}`}> {changeAddress ? 'Select from Saved Address ' : 'Delivery Address ✔ '}</h1>

                            {!changeAddress ? <>
                                <div className='inner-address'>

                                    <div id='d-address'>
                                        Railway quarters,
                                        behind guest house,
                                        new latur railway station,
                                        Latur,
                                        Maharashtra - 413513
                                    </div>
                                    <div>
                                        <button onClick={() => {
                                            if (changeAddress === false) {
                                                setChangeAddress(true)
                                            } else {
                                                setChangeAddress(false)
                                            }
                                        }} className=" rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" > Change</button>
                                    </div>

                                </div></> : <><ul>
                                    <li>Address1 </li>
                                </ul></>}

                        </div>


                        <br></br>

                        <div className='left-child bg-white shadow'>
                            <h1>Select Payment Mode</h1>

                        </div>
                    </div>

                    {/* Right Side section */}
                    {/* <div className='right'> */}
                    <div className='col-span-6 lg:col-span-2'>
                        <div className="mx-auto max-w-7xl px-4 py-6  sm:px-6 lg:px-8 bg-white shadow">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                Order Summary
                            </h2>
                            <div className={`mx-auto mt-2 bg-white max-w-7xl px-4 sm:px-6 lg:px-8`}>
                                <div className={`border-t border-gray-200 px-4 sm:px-6  ${status === STATUS.LOADING && 'blur-sm animate-pulse'} `}>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul className={`-my-6 divide-y divide-gray-200`}>
                                                {Products.map((product) => (
                                                    <li key={product.id} className="flex py-6">
                                                        <span className='hidden'>
                                                            {total += (Math.round(product.price - ((product.price) * (product.discountPercentage / 100))) * product.quantity
                                                            )}
                                                        </span>
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={product.thumbnail}
                                                                alt={product.title}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <Link to={`/product-detail/${product.id}`}>{product.title}</Link>
                                                                    </h3>
                                                                    <div className='flex  flex-col'>
                                                                        <p className=""> ${(Math.round(product.price - ((product.price) * (product.discountPercentage / 100))) * product.quantity
                                                                        )}</p>
                                                                        <p className="tracking-tight text-gray-900 line-through">${product.quantity * product.price}</p>
                                                                    </div>


                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div className="text-gray-500">
                                                                    <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                                                                        Qty
                                                                    </label>
                                                                    <select onChange={(e) => changeQuantity(e, product)} value={product.quantity}>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                    </select>
                                                                </div>

                                                                <div className="flex">
                                                                    <button onClick={() => handleDelete(product)}
                                                                        type="button"
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-5 border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${total}</p>
                                        </div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                        </div>
                                        <div className="mt-6">
                                            <Link
                                                to="/checkout"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Checkout
                                            </Link>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                <Link to='/'>

                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailNew