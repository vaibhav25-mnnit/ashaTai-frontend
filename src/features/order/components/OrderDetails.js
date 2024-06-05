import React from 'react'
import { Timeline } from 'flowbite-react';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useState } from 'react';


const orderStatus = [
    {
        status: 'pending',
        date: 'AUG 17,2023',
        comment: 'Order confirmation pending from seller'
    },
    {
        status: 'confirmed',
        date: 'AUG 17,2023',
        comment: 'Order confirmed by seller'

    },
    {
        status: 'packed',
        date: 'AUG 18,2023',
        comment: 'Order Packed by seller'

    },
    {
        status: 'shipped',
        date: 'AUG 18,2023',
        comment: 'Shipment created with tracking id #EM123klsf'

    },
    {
        status: 'delivered',
        date: 'AUG 20,2023',
        comment: 'Order delivered successfully'
    }
]

function OrderDetails({ order }) {

    const [showStatus, setShowStatus] = useState(false)

    return (
        <>
            <div className='flex flex-col mt-2 items-center justify-center  gap-y-5 px-40'>

                {/* Top Pannel */}
                <div className='w-full '>

                    <div className='sm:flex-wrap sm:flex-col sm:gap-y-2 md:flex-wrap md:gap-y-2 md:flex-col lg:flex-nowrap mt-2 flex lg:flex-row justify-between lg:gap-x-5'>

                        {/* Address Details */}
                        <div className='h-full p-5 w-full border-2 border-grey-800 bg-white shadow' >
                            <h1 className='text-xl mb-2 font-semibold'>Delivery Address</h1>
                            <hr className='mb-3' />
                            <div>
                                <h2 className='text-lg font-medium'>{order.address.fullName}</h2>
                                <div className='w-2/3 my-2'>
                                    <p className=''>
                                        {order.address.streetAddress}
                                    </p>
                                    <p>
                                        {order.address.city},

                                    </p>
                                    <p>
                                        {order.address.state} - {order.address.pinCode}
                                    </p>
                                </div>
                                <div>
                                    <span className='font-medium'>Phone Number</span>
                                    <div>{order.address.phoneNumber}</div>
                                </div>
                            </div>
                        </div>


                        {/* Payment Details */}
                        <div className='h-full p-5 w-full border-2 border-grey-800 bg-white shadow' >
                            <h1 className='text-xl mb-2 font-semibold'>Payment Details</h1>
                            <hr className='mb-3' />
                            <div>
                                <h2>Payment Method: <span>Cash</span></h2>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                            </div>
                        </div>


                        {/* Price Details */}
                        <div className='h-full p-5 w-full border-2 border-grey-800 bg-white shadow' >
                            <h1 className='text-xl mb-2 font-semibold'>Price Details</h1>
                            <hr className='mb-3' />

                            <div className='flex flex-col  gap-y-2 justify-center w-full'>

                                <div className="flex justify-between text-base text-gray-900">
                                    <p>Price (2 items)</p>
                                    <p>${order.priceDetails.totalPrice}</p>
                                </div>

                                <div className="flex justify-between text-base  text-gray-900">
                                    <p>Discount</p>
                                    <p style={{
                                        color: '#388e3c',
                                        fontWeight: 'bold'
                                    }}>-${order.priceDetails.discount}</p>
                                </div>

                                <div className=" flex justify-between text-base text-gray-900">
                                    <p>Delivery Charges</p>
                                    <p>Free</p>
                                </div>

                                <hr />

                                <div className=" flex justify-between text-base text-gray-900">
                                    <p>Total Amount</p>
                                    <p>${order.priceDetails.toPay}</p>
                                </div>

                                <hr />

                                <div className='mt-2 '>
                                    <p style={{
                                        color: '#388e3c',
                                        fontWeight: 'bold'
                                    }}>You saved ${'20'} on this order</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* Order Status  */}
                <div className='w-full p-5 text-sm bg-white shadow '>
                    <div className='flex justify-between items-center'>
                        <div> <h1 className='text-xl mb-5 font-medium'>Order Status</h1>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    if (showStatus)
                                        setShowStatus(false)
                                    else
                                        setShowStatus(true)

                                }}
                                className="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800" >{showStatus ? 'Close' : 'Show'}
                            </button>

                        </div>
                    </div>

                    <hr />

                    {showStatus && <div className='flex justify-center'>

                        <div className='w-1/5 mt-5'>

                            <Timeline >

                                {orderStatus.map(order =>
                                    <Timeline.Item>
                                        <Timeline.Point icon={BsFillCheckCircleFill}>
                                        </Timeline.Point>

                                        <Timeline.Content>
                                            <Timeline.Title>
                                                {order.status}
                                            </Timeline.Title>
                                            <Timeline.Time>
                                                {order.date}
                                            </Timeline.Time>
                                            <Timeline.Body>
                                                {order.comment}
                                            </Timeline.Body>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                )}

                            </Timeline>

                        </div>
                    </div>}
                </div>

                {/* Items in Order */}
                <div className=' w-full p-5 gap-x-5 flex flex-col bg-white  '>
                    <h1 className='text-xl mb-2 font-medium'>Items in this Order</h1>
                    <hr className='mb-3' />

                    {order.items.map(item => <div className='w-full  h-auto bg-white shadow '>
                        <h1>{item.title}</h1>
                    </div>)}


                </div>

            </div >
        </>
    )
}

export default OrderDetails