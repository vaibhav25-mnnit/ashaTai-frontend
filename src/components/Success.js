import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCurrentOrder } from '../features/order/orderSlice'
import { resetCartAsync } from '../features/cart/cartSlice'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import { selectUser } from '../features/auth/authSlice'

function Success() {

    const params = useParams()

    const user = useSelector(selectUser)
    const id = params.id;
    const status = params.status;

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(resetCurrentOrder())
        if (status === 'success') {
            dispatch(resetCartAsync(user._id));
        }
    }, [dispatch])

    return (
        <>

            <div className='flex justify-center'>
                <main className="grid mt-5  min-h-full w-[70%] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <div className='flex justify-center' >
                            <img style={{
                                border: '2px solid grey',
                                borderRadius: '100px'
                            }} width={'100px'} height='100px' src={status === 'success' ? 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3EyejhiNHIxdjl2cGg2dzlxaXhya3Z3Y3Zhd2t5bmpqdjVmM244bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/NZyXJ00YoHWA0g3x4x/giphy.gif' :
                                'https://media2.giphy.com/media/KFtoeyGbuENeJrnv2j/200w.webp?cid=ecf05e47zs0j8twtg6wtdb9ent1gayxbmp28qwrvnahj62o8&ep=v1_stickers_search&rid=200w.webp&ct=s'}>

                            </img>
                        </div>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{status === 'success' ? 'Order Placed Successfully' : 'Order Not Placed'}</h1>
                        <p className="mt-6 text-base leading-7 text-gray-600"> {status === 'success' ? `Order id #${id}` : 'Transaction failed'}</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {status === 'success' ?
                                <Link
                                    to="/orders"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Go to My Orders

                                </Link> :
                                <Link
                                    to="/"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Go back home
                                </Link>
                            }
                        </div>
                    </div>
                </main>
            </div>

        </>
    )
}

export default Success
