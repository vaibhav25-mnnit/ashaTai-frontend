import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { deleteItem, selectCartProducts, selectCartStatus, updateCart } from '../features/cart/cartSlice'
import { STATUS } from '../app/constants'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { selectUser, updateUser } from '../features/auth/authSlice'


function Checkout() {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();


    const Products = useSelector(selectCartProducts)
    const status = useSelector(selectCartStatus)
    const currentUser = useSelector(selectUser)
    const dispatch = useDispatch()
    let total = 0;

    const changeQuantity = (e, product) => {
        dispatch(updateCart({ ...product, quantity: +e.target.value }))
    }

    const handleDelete = async (product) => {
        await dispatch(deleteItem(product))
        toast.success(`successfully removed ${product.title} from cart.`)
    }


    const onSubmit = async (data) => {
        await dispatch(updateUser({ ...currentUser, addresses: [...currentUser.addresses, data] }))
        reset()
        toast.success('Successfully added new address.')
    }

    const address = {
        fullName: "Vaibhav Bagate",
        phoneNumber: "9325763684",
        email: "vb9822445937@gmail.com",
        streetAddress: "Railway quarters,\nbehind guest house ,\nnew latur railway station\nNew Latur Railway station",
        city: "Latur",
        state: "Maharashtra",
        pinCode: "413512"
    }
    return (<>
        {Products.length <= 0 && <Navigate to='/' />}

        < div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                {/* Left side pannel for information */}
                <div className="lg:col-span-3" >
                    <form noValidate onSubmit={handleSubmit(onSubmit)} className="bg-white px-5 py-12 mt-12">
                        <div className="space-y-12">

                            <details>
                                <summary>Deliver to</summary>
                                <div className="flex gap-x-4">

                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            {address.fullName}
                                        </p>

                                        {
                                            address.streetAddress.split('\n').map(ele => {
                                                return <p className="mt-1 truncate text-xs leading-5 text-gray-500"> {ele} </p>
                                            })}
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {address.city},
                                        </p>

                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {address.state} - {address.pinCode}
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">
                                        Phone: {address.phoneNumber}
                                    </p>
                                </div>

                            </details>


                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                    Personal Information
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Use a permanent address where you can receive mail.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    {/* Full Name */}
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="fullName"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Full Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("fullName", {
                                                    required: "Full Name is required"
                                                })}
                                                type="text"
                                                name="fullName"
                                                id="fullName"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.fullName && <span className='text-red-500'>{errors.fullName.message}</span>}
                                    </div>

                                    {/* Phone Number */}
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="phoneNumber"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Phone Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('phoneNumber', {
                                                    required: "Phone Number is required",
                                                    maxLength: {
                                                        value: 10,
                                                        message: 'Please Enter Valid Phone Number.'
                                                    },
                                                    pattern: {
                                                        value: /(\+)?(91)?( )?[789]\d{9}/,
                                                        message: 'Please Enter Valid Phone Number.'
                                                    }
                                                })}
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type='text'
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.phoneNumber && <span className='text-red-500'>{errors.phoneNumber.message}</span>}
                                    </div>


                                    {/* Email */}
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('email', {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                                        message: 'Email is not Valid'
                                                    }
                                                })}
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                                    </div>



                                    {/* Street-address */}
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="streetAddress"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Complete Address
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                {...register('streetAddress', {
                                                    required: "Street Address is required."
                                                })}
                                                rows="4"
                                                cols="40"
                                                name="streetAddress"
                                                id="streetAddress"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                            </textarea>
                                        </div>

                                        {errors.streetAddress && <span className='text-red-500'>{errors.streetAddress.message}</span>}
                                    </div>


                                    {/* City */}
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('city', {
                                                    required: "City is required"
                                                })}
                                                type="text"
                                                name="city"
                                                id="city"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.city && <span className='text-red-500'>{errors.city.message}</span>}
                                    </div>


                                    {/* State */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="state"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            State
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('state', {
                                                    required: 'State is required.'
                                                })}
                                                type="text"
                                                name="state"
                                                id="state"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.state && <span className='text-red-500'>{errors.state.message}</span>}
                                    </div>

                                    {/* Pin Code */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="pinCode"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Postal code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('pinCode', {
                                                    required: 'Postal Code is required',
                                                    pattern: {
                                                        value: /([1-9][0-9]{5}|[1-9][0-9]{2}[\s]\d{3})/ig,
                                                        message: "Enter Valid Postal Code"
                                                    }
                                                })}
                                                type='text'
                                                name="pinCode"
                                                id="pinCode"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>

                                        {errors.pinCode && <span className='text-red-500'>{errors.pinCode.message}</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="button"
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                    onClick={() => reset()}
                                >
                                    Reset
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Address
                                </button>
                            </div>
                            {/* ---------------- */}

                            <div className="border-b border-gray-900/10 pb-12">


                                <details>
                                    <summary> Choose from Existing addresses</summary>

                                    {/*  <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Addresses
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Choose from Existing addresses
                                     </p> 
                                */}
                                    <ul >
                                        {currentUser.addresses?.map((address) => (
                                            <li
                                                // key={ }
                                                className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 mb-5"
                                            >
                                                <div className="flex gap-x-4">
                                                    <input
                                                        name="address"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                            {address.fullName}
                                                        </p>

                                                        {
                                                            address.streetAddress.split('\n').map(ele => {
                                                                return <p className="mt-1 truncate text-xs leading-5 text-gray-500"> {ele} </p>
                                                            })}
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address.city},
                                                        </p>

                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address.state} - {address.pinCode}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">
                                                        Phone: {address.phoneNumber}
                                                    </p>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                </details>


                                {/* Payment Mode */}
                                <details>
                                    <summary>Select Payment Method</summary>

                                    <div className="mt-2 space-y-10">
                                        <fieldset>
                                            {/* <legend className="text-sm font-semibold leading-6 text-gray-900">
                                                    Payment Methods
                                                </legend> */}
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Choose One
                                            </p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payments"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label
                                                        htmlFor="cash"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        name="payments"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label
                                                        htmlFor="card"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Card Payment
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </form>
                </div >

                {/* right side pannel for quick look at cart  */}
                < div className="lg:col-span-2" >

                    <div className="mx-auto max-w-7xl px-4 py-6 mt-12 sm:px-6 lg:px-8 bg-white shadow">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                            Order Summary
                        </h2>
                        <div className={`mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8`}>
                            <div className={`border-t border-gray-200 px-4 sm:px-6  ${status === STATUS.LOADING && 'blur-sm animate-pulse'} `}>
                                <div className="mt-8">
                                    <div className="flow-root">

                                        <ul className={`-my-6 divide-y divide-gray-200`}>
                                            {Products.map((product) => (
                                                <li key={product.id} className="flex">
                                                    {total += (Math.round(product.price - ((product.price) * (product.discountPercentage / 100))) * product.quantity
                                                    )}

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
                </div >
            </div >


        </div >
    </>
    );
}

export default Checkout