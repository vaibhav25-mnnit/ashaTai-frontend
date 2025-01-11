import React, { useEffect } from "react";

import Navbar from "../features/navbar/Navbar";
import { useParams } from "react-router-dom";
import OrderDetails from "../features/order/components/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderByIdAsync,
  resetCurrentOrder,
  selectCurrentOreder,
} from "../features/order/orderSlice";
import Loader from "../components/Loader";

function OrderDetailsPage() {
  const data = useParams();
  const dispatch = useDispatch();
  const order = useSelector(selectCurrentOreder);

  useEffect(() => {
    dispatch(getOrderByIdAsync(data.id));

    return () => {
      dispatch(resetCurrentOrder());
    };
  }, [data.id]);

  return (
    <Navbar children={order ? <OrderDetails order={order} /> : <Loader />} />
  );
}

export default OrderDetailsPage;
