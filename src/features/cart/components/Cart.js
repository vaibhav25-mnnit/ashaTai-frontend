import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteItem, selectCartProducts, updateCart } from '../cartSlice'


function Cart() {

    const Products = useSelector(selectCartProducts)
    const dispatch = useDispatch()
    let total = 0;

    const changeQuantity = (e, product) => {
        dispatch(updateCart({ ...product, quantity: +e.target.value }))
    }

    const handleDelete = (product) => {
        dispatch(deleteItem(product))
    }
    return (
        <>
            {Products.legth <= 0 ? 'your cart is empty' :
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white shadow">
                    <div className='mx-auto mt12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
                        <div className='border-t border-gray-200 px-4 sm:px-6'>
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul className="-my-6 divide-y divide-gray-200">
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
                                                                <p className="tracking-tight text-gray-900 line-through">${product.price}</p>
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


                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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
            }
        </>
    )
}

export default Cart