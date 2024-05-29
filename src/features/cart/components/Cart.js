import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteItem, resetCartAsync, selectCartProducts, selectCartStatus, updateCart } from '../cartSlice'
import { STATUS } from '../../../app/constants'
import { toast } from 'react-hot-toast'
import { selectUser } from '../../auth/authSlice'

function Cart({ width = '2/3', flag }) {

    const Products = useSelector(selectCartProducts)
    const status = useSelector(selectCartStatus)
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    let total = 0;

    const changeQuantity = (e, product) => { 
        dispatch(updateCart({id:product.id  ,quantity: +e.target.value }))
    }

    const handleDelete = async (data) => {
        await dispatch(deleteItem(data.id))
        // console.log(product);
        toast.success(`successfully removed ${data.product.title} from cart.`)
    }

  
    const handleReset = async () => {
        await dispatch(resetCartAsync(user.id))
        toast.success(`successfully cleared cart.`)
    }
    return (
        <>
            {
                Products.length <= 0 ? 'your cart is empty' :
                    <div>
                        <div className={`mt-2 mx-auto max-w-7xl w-${width} px-4 py-6 sm:px-6 lg:px-8 bg-white shadow`}>
                            <div className={`mx-auto bg-white max-w-7xl px-4 sm:px-6 `}>
                                <div className={`border-t border-gray-200 px-4 sm:px-6 `}>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul className={`-my-6 divide-y divide-gray-200`}>
                                                {Products.map((p) => (
                                                    <li key={p.product.id} className={`flex py-6  ${status === STATUS.LOADING && 'blur-sm animate-pulse'} `}>
                                                        <span className='hidden'>
                                                            {total += (Math.round(p.product.price - ((p.product.price) * (p.product.discountPercentage / 100))) * p.quantity
                                                            )}
                                                        </span>
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={p.product.thumbnail}
                                                                alt={p.product.title}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <Link to={`/product-detail/${p.product.id}`}>{p.product.title}</Link>
                                                                    </h3>
                                                                    <div className='flex  flex-col'>
                                                                        <p className=""> ${(Math.round(p.product.price - ((p.product.price) * (p.product.discountPercentage / 100))) * p.quantity
                                                                        )}</p>
                                                                        <p className="tracking-tight text-gray-900 line-through">${p.quantity * p.product.price}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                               
                                                                <div className="text-gray-500">
                                                                    <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                                                                        Qty
                                                                    </label>
                                                                    <select onChange={(e) => changeQuantity(e, p)} value={p.quantity}>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                        <option value={5}>5</option>
                                                                    </select>
                                                                </div>

                                                                <div className="flex">
                                                                    <button onClick={() => handleDelete(p)}
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

                                    <div className={`mt-5 border-t border-gray-200 px-4 py-6 sm:px-6`}>
                                        < div className={`flex justify-between text-base font-medium text-gray-90  ${status === STATUS.LOADING && 'blur-sm animate-pulse'}`}>
                                            <p>Subtotal</p>
                                            <p>${total}</p>
                                        </div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                        </div>
                                        <div className="mt-6">
                                            <Link to="/checkout" >
                                                <button disabled={status === STATUS.LOADING} className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${status === STATUS.LOADING && 'bg-indigo-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'}`}>
                                                    Checkout
                                                </button>
                                            </Link>
                                        </div>
                                        {!flag && <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                <Link to='/'>

                                                    <button
                                                        disabled={status === STATUS.LOADING}
                                                        type="button"
                                                        className={`font-medium text-indigo-600 hover:text-indigo-500 ${status === STATUS.LOADING && 'cursor-not-allowed'}`}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </Link>
                                            </p>
                                        </div>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div >
            }
        </>
    )
}

export default Cart