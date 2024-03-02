import React, { useEffect } from 'react'

import Navbar from '../features/navbar/Navbar';
import { useParams } from 'react-router-dom'
import OrderDetails from '../features/order/components/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByIdAsync, resetCurrentOrder, selectCurrentOreder } from '../features/order/orderSlice';

function OrderDetailsPage() {
    const data = useParams();
    const dispatch = useDispatch()
    const order = useSelector(selectCurrentOreder)

    useEffect(() => {
        dispatch(getOrderByIdAsync(data.id))

        return () => {
            dispatch(resetCurrentOrder())
        }
    }, [data.id])

    return (

        <Navbar title={`Order #${data.id}`} children={
            order ?
                <OrderDetails order={order} />
                :
                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                    }
                }>
                    <div
                        className="flex h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                </div>

        } />
    )
}

export default OrderDetailsPage