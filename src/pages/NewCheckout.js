import '../components/styles/newCheckout.css'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-hot-toast'
import { cashfreeSandbox } from "cashfree-pg-sdk-javascript";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import AddressInputFrom from '../components/AddressInputFrom'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, Modal } from 'flowbite-react';

import { STATUS } from '../app/constants'
import { selectAuthStatus, selectUser, updateUser } from '../features/auth/authSlice'
import { createOrderAsync, selectCurrentOreder, selectOrderStatus } from '../features/order/orderSlice'
import { getSessionIdAsync, selectPaymentSessionId, selectPaymentStatus } from '../features/payment.js/paymentSlice'
import { selectCartProducts, selectCartStatus, updateCart, deleteItem, resetCartAsync } from '../features/cart/cartSlice'
import Loader from '../components/Loader'
// import { giveSessionId } from '../features/payment.js/paymentApi';


export default function NewCheckout() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Products = useSelector(selectCartProducts)
    const cartStatus = useSelector(selectCartStatus)
    const user = useSelector(selectUser)
    const currentOrder = useSelector(selectCurrentOreder)
    const authStatus = useSelector(selectAuthStatus)
    const orderStatus = useSelector(selectOrderStatus)
    const paymentStatus = useSelector(selectPaymentStatus)
    const sessionId = useSelector(selectPaymentSessionId)

    const [openForm, setopenForm] = useState(false)
    const [showSummary, setShowSummary] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [cashButton, setCashButton] = useState(true)
    const [id, setId] = useState(null)
    // change quantity of product
    const changeQuantity = (e, product) => {
        dispatch(updateCart({ ...product, quantity: +e.target.value }))
    }

    //delete product from cart
    const handleDelete = async (product) => {
        await dispatch(deleteItem(product))
        toast.success(`successfully removed ${product.title} from cart.`)
    }

    //select the address for delivery
    const handleSelectAddress = async (data) => {
        await dispatch(updateUser({ ...user, selectedAddress: data }))
        toast.success('Successfully Updated delivery address.')
        Cancel();
    }

    //update price total
    const updatePrice = () => {
        let totalPrice = 0, discount = 0;
        Products.forEach((product) => {
            totalPrice += (product.price * product.quantity)
            discount += (Math.round(((product.price) * (product.discountPercentage / 100))) * product.quantity)
        })

        setDiscount(discount)
        setTotalPrice(totalPrice)
    }

    useEffect(() => {
        updatePrice();
    }, [Products])

    //to close the address modal
    const Cancel = () => {
        setopenForm(false)
        setOpenModal(false)
    }



    //to handle the order
    const handleOrder = async () => {

        const order = {
            user: "64e4edf374e34b3d2365e054",
            items: Products,
            priceDetails: {
                totalPrice: totalPrice,
                discount: discount,
                toPay: totalPrice - discount
            },

            address: user.selectedAddress
        }

        if (paymentMethod === 'cash') {
            const res = await fetch('http://localhost:5000/pay/create-order?mode=cash', {
                method: "POST",
                body: JSON.stringify({
                    ...order,
                    paymentDetails: {
                        method: 'cash',
                    }
                }),
                headers: { 'content-type': 'application/json' },
            })
            const d = await res.json();
            const o = await d.data;

            navigate(`/order-success/${o.id}/success`, { replace: true })

        } else if (paymentMethod === 'online') {
            await setOpenPayment(true)
            await startPayment(order);
        } else {
            alert("Please Select Payment method")
        }
        /*
        if (paymentMethod === 'cash') {
            // alert('Ordering through cod.')
            await dispatch(createOrderAsync({
                user: user.id,
                items: Products,
                paymentDetails: {
                    method: 'cash',
                },
                priceDetails: {
                    totalPrice: totalPrice,
                    discount: discount,
                    toPay: totalPrice - discount
                },
     
                address: user.selectedAddress
            }))
        }
        else if (paymentMethod === 'online') {
            await setOpenPayment(true)
            await startPayment();
        }
        else {
            alert("Please Select Payment method")
        }
        */
    }

    const getSessionId = async (order) => {

        const data = {
            user: "64e4edf374e34b3d2365e054",
            items: Products,
            priceDetails: {
                totalPrice: totalPrice,
                discount: discount,
                toPay: totalPrice - discount
            },
            address: user.selectedAddress
        }

        const res = await fetch('http://localhost:5000/pay/create-order?mode=online', {
            method: "POST",
            body: JSON.stringify(order),
            headers: { 'content-type': 'application/json' },
        })
        const d = await res.json();
        setId(d.payment_session_id)
        return d.payment_session_id;
    }

    const getPaymentStatus = async (id) => {
        const res = await fetch('http://localhost:5000/pay/verify-order/' + id)
        const d = await res.json();
        return d;
    }

    const updateOrder = async (id, data) => {
        const update = {
            paymentDetails: data
        }

        // console.log(update)
        const updatedOrder = await fetch(`http://localhost:5000/order/update/` + id, {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: { 'content-type': 'application/json' },
        })
        const d = await updatedOrder.json()
        return d;
    }
    //to start the payment
    const startPayment = async (order) => {

        const PaymentSessionId = await getSessionId(order);
        setId(PaymentSessionId)
        // console.log(PaymentSessionId)
        let cashfree = new cashfreeSandbox.Cashfree(PaymentSessionId);

        const dropinConfig = {
            components: [
                "order-details",
                "card",
                "netbanking",
                "upi",
            ],

            onSuccess: async function (data) {
                // console.log('from success function')
                // console.log(data);
                // console.log("payment is successfull redirect")
                const paymentDetails = await getPaymentStatus(data.order.orderId)
                // console.log(paymentDetails)
                const update = { ...paymentDetails, transaction_data: data }


                const up = await updateOrder(data.order.orderId, update)
                // console.log('updated order')
                // console.log(up)
                if (paymentDetails[0].payment_status === 'SUCCESS') {
                    navigate(`/order-success/${data.order.orderId}/success`, { replace: true })
                }
                else
                    navigate(`/order-success/${data.order.orderId}/failed`, { replace: true })

            },
            onFailure: async function (data) {
                // console.log('form failure function')
                // console.log(data);
                const paymentDetails = await getPaymentStatus(data.order.orderId)
                // console.log(paymentDetails)
                const update = { ...paymentDetails, transaction_data: data }
                const up = await updateOrder(data.order.orderId, update)
                // console.log('updated order')
                // console.log(up)
                navigate(`/order-success/${data.order.orderId}/failed`, { replace: true })
            },

            style: {
                backgroundColor: "#ffffff",
                color: "#11385b",
                fontSize: "14px",
                fontFamily: "Lato",
                errorColor: "#ff0000",
                theme: "light",
            }
        }

        await cashfree.drop(document.getElementById("render"), dropinConfig);
    }


    const handleVerification = ({ token, ekey }) => {
        setCashButton(false)
        // const res = await fetch('https://hcaptcha.com/siteverify', {
        //     method: 'POST',
        //     body: `response=${token}&secret=${0x8171E921A369E0597d81D4118494eAd94dbc9340}`,
        //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        // })
        // const data = await res.json();
        // console.log(data)
    }

    return (
        <>
            {Products.length <= 0 && <Navigate replace={true} to='/' />}

            {currentOrder && <Navigate replace={true} to={`/order-success/${currentOrder.id}/success`} />}

            <div className='main'>
                {/* <div className='upper-main'> */}
                <div className='grid grid-cols-6 gap-4 px-20' style={{
                    'padding': '0 8rem'
                }}>
                    <div className='col-span-6 lg:col-span-4'>

                        {/* Login Details */}
                        <div className='left-child bg-white shadow'>
                            <h1>Login Details ✔</h1>
                            <hr />
                            <div>
                                <div>
                                    {user.name}
                                    <br />
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <br></br>

                        {/* Address Selection */}
                        <div className='left-child bg-white shadow' >

                            <div className='flex justify-between items-center'>
                                <div>
                                    <h1>Delivery Address ✔</h1>
                                </div>
                                <div>
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800" > Change
                                    </button>

                                </div>
                            </div>

                            {/* Modal */}
                            <Modal show={openModal} size={'lg'} onClose={() => setOpenModal(false)}>

                                <Modal.Header>{openForm ? "Add New Address" : "Select From Saved Addresses"}</Modal.Header>
                                {
                                    authStatus === STATUS.LOADING ?
                                        <div style={
                                            {
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }
                                        }>
                                            <div className="flex h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                role="status">
                                                <span
                                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                                >Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        <>
                                            <Modal.Body>
                                                {openForm
                                                    ?
                                                    <AddressInputFrom Cancel={Cancel} />
                                                    :

                                                    <AddressList addresses={user.addresses} handleSelectAddress={handleSelectAddress} setOpenModal={setOpenModal} />
                                                }
                                            </Modal.Body>

                                            {!openForm &&
                                                <Modal.Footer>
                                                    <Button onClick={() => setopenForm(true)} >Add New Address</Button>
                                                </Modal.Footer>
                                            }
                                        </>
                                }
                            </Modal>

                            <hr />
                            <div className='d-address '>
                                <div className='inner-address'>

                                    <div className='d-address'>
                                        <h1 className='font-bold'>{user.selectedAddress.fullName}</h1>
                                        {
                                            user.selectedAddress.streetAddress
                                        }
                                        <p >
                                            {user.selectedAddress.city}, {user.selectedAddress.state} - {user.selectedAddress.pinCode}
                                        </p>
                                        <h5> Phone: {user.selectedAddress.phoneNumber}</h5>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <br></br>


                        {/* Order Summary */}
                        <div className='left-child bg-white shadow'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    {showSummary ? <h1>
                                        Edit Order
                                    </h1> : <div>
                                        <h1>Order Summary ✔ </h1>
                                    </div>
                                    }
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (showSummary === false) {
                                                setShowSummary(true)
                                            } else {
                                                setShowSummary(false)
                                            }
                                        }} className="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800">

                                        {
                                            showSummary ?
                                                'Hide'
                                                : 'View'
                                        }
                                    </button>

                                </div>
                            </div>

                            {showSummary &&
                                <div>
                                    <hr />
                                    <div className="flex h-full flex-col ">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="mt-2">
                                                <div className="flow-root">
                                                    <ul role="list" className={`-my-6 divide-y divide-gray-200 ${cartStatus === STATUS.LOADING && 'blur-sm animate-pulse'}`}>
                                                        {
                                                            Products.map((product) => (

                                                                <li key={product.id} className="flex py-6">
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
                                                                                    <p className="ml-4">
                                                                                        ${
                                                                                            (Math.round(product.price - ((product.price) * (product.discountPercentage / 100))) * product.quantity)
                                                                                        }
                                                                                    </p>
                                                                                    <p className="ml-4 tracking-tight text-gray-900 line-through">${product.quantity * product.price}</p>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <div>
                                                                                <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                                                                                    Qty :
                                                                                </label>
                                                                                <select style={{
                                                                                    border: '1px solid grey',
                                                                                    borderRadius: '10px'
                                                                                }}
                                                                                    className='inline  text-md font-medium text-gray-900'
                                                                                    onChange={(e) => changeQuantity(e, product)} value={product.quantity}>
                                                                                    <option value={1}>1</option>
                                                                                    <option value={2}>2</option>
                                                                                    <option value={3}>3</option>
                                                                                    <option value={4}>4</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="flex">
                                                                                <button
                                                                                    onClick={() => handleDelete(product)}
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <br />

                        {/* Payment Method */}
                        <div className='left-child bg-white shadow'>
                            <h1>Select Payment Mode</h1>
                            <hr />
                            <div className="flex justify-between mt-3 space-y-6">
                                <div className='space-y-6 p-2'>

                                    <div className='flex flex-col  gap-y-5'>

                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="online"
                                                name="payments"
                                                type="radio"
                                                checked={paymentMethod === 'online'}
                                                value='online'
                                                className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                onChange={(e) => {
                                                    setPaymentMethod(e.target.value)
                                                }} />
                                            <label
                                                htmlFor="online"
                                                checked
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Pay Now
                                            </label>

                                        </div>

                                        {paymentMethod === 'online' &&
                                            <div
                                                className={`ml-10 flex block cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700`}
                                                onClick={handleOrder}
                                            >
                                                Place Order
                                            </div>
                                        }
                                    </div>

                                    <div className='flex flex-col  gap-y-5'>

                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="cash"
                                                name="payments"
                                                type="radio"
                                                value='cash'
                                                className="h-4 w-4 cursor-pointer  border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                checked={paymentMethod === 'cash'}
                                                onChange={async (e) => {
                                                    setPaymentMethod(e.target.value)
                                                }}
                                            />
                                            <label
                                                htmlFor="cash"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Cash On Delivery
                                            </label>
                                        </div>
                                        {paymentMethod === 'cash' &&
                                            <div className='flex ml-10  items-center' >

                                                <HCaptcha
                                                    sitekey="6db06f65-536e-4d2c-8dc0-7a5767fbeb90"
                                                    onVerify={(token, ekey) => handleVerification(token, ekey)}
                                                />
                                                <button
                                                    disabled={(cashButton || orderStatus === STATUS.LOADING)}
                                                    className={`ml-10 w-full flex block cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700  ${(cashButton || orderStatus === STATUS.LOADING) && 'cursor-not-allowed bg-indigo-500 text-white font-bold py-2 px-4 rounded opacity-50 '}`}
                                                    onClick={handleOrder}
                                                >
                                                    Place Order
                                                </button>
                                            </div>
                                        }
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>

                    {/* Right Side section */}

                    {/* <div className='right'> */}
                    <div className='col-span-5  lg:col-span-2 ' style={{
                        width: '129%'
                    }}>
                        <div className={`left-child bg-white shadow`} >
                            <h1 style={{
                                color: '#5c5959',
                                fontSize: '16px',
                                fontWeight: '500'
                            }} className="mt-2 ml-5 mb-2">
                                Price Details
                            </h1>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

                                <div className='main-2'>

                                    <div className={`${cartStatus === STATUS.LOADING && 'blur-sm animate-pulse'}`}>
                                        <div className="inner-price font-medium text-gray-900">
                                            <p>Price ({Products.length} items)</p>
                                            <p>${totalPrice}</p>
                                        </div>

                                        <div className="inner-price font-medium text-gray-900">
                                            <p>Discount</p>
                                            <p style={{
                                                color: '#388e3c',
                                                fontWeight: 'bold'
                                            }}>-${discount}</p>
                                        </div>

                                        <div className="inner-price font-medium text-gray-900">
                                            <p>Delivery Charges</p>
                                            <p>Free</p>
                                        </div>

                                        <hr />

                                        <div className="final-amount font-medium text-gray-900">
                                            <p>Total Amount</p>
                                            <p>${Math.round(totalPrice - discount)}</p>
                                        </div>

                                        <hr />

                                        <div className='mt-5 mb-10'>
                                            <p style={{
                                                color: '#388e3c',
                                                fontWeight: 'bold'
                                            }}>You will save ${discount} on this order</p>
                                        </div>
                                    </div>
                                    <hr />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal for payment gateway */}
            <Modal show={openPayment} size={'lg'} onClose={() => setOpenPayment(false)}>
                <div className='overflow-hidden p-2'>
                    {
                        !id &&
                        <Modal.Body className='flex flex-col justify-center items-center text-xl  gap-y-5 '>
                            <h1>Loading Payment Gateway</h1>
                            <h2> Please do not close or refresh this page.</h2>
                            <Loader></Loader>
                        </Modal.Body>
                    }
                    <div id='render' className='overflow-x-hidden' > </div>

                </div>


            </Modal >
        </>

    )
}




function AddressList({ addresses, handleSelectAddress, setOpenModal }) {


    return <>
        <div>
            <div className="flex h-full flex-col ">
                <div className="flex-1 overflow-y-auto py-3 sm:px-6">
                    <div>
                        <div className="flow-root">

                            {
                                addresses.map((address, index) => (
                                    <>
                                        <div key={index} class="flex flex-col mb-3 items-center  border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
                                            <div class="flex flex-col justify-between p-4 leading-normal">
                                                <h5 class="mb-2 text-xl font-bold text-gray-900">{address.fullName}</h5>
                                                <p class=" font-normal ">{address.streetAddress}</p>
                                                <p class=" font-normal ">{address.city}</p>
                                                <p class=" font-normal ">{address.state} - {address.pinCode}</p>
                                                <p class=" font-normal mt-2">Phone: {address.phoneNumber}</p>
                                            </div>
                                            <button class="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={
                                                async () => {
                                                    await handleSelectAddress(address)
                                                    await setOpenModal(false)
                                                }
                                            }> Deliver Here</button>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}
