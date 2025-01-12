import "../components/styles/checkout.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { cashfreeSandbox } from "cashfree-pg-sdk-javascript";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import AddressInputFrom from "./AddressInputFrom";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";

import { STATUS } from "../app/constants";

import {
  selectAuthStatus,
  selectUser,
  updateUser,
} from "../features/auth/authSlice";

import {
  createOrderAsync,
  selectCurrentOreder,
  selectOrderStatus,
  updateOrderAsync,
} from "../features/order/orderSlice";

import { verifyPayment } from "../features/payment/paymentApi";

import {
  selectCartProducts,
  selectCartStatus,
  updateCart,
  deleteItem,
} from "../features/cart/cartSlice";

import Loader from "./Loader";
import AddressDetail from "./AddressDetail";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Products = useSelector(selectCartProducts);
  const cartStatus = useSelector(selectCartStatus);
  const user = useSelector(selectUser);
  const currentOrder = useSelector(selectCurrentOreder);
  const authStatus = useSelector(selectAuthStatus);
  const orderStatus = useSelector(selectOrderStatus);

  const [openForm, setopenForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [cashButton, setCashButton] = useState(true);
  const [id, setId] = useState(null);

  // change quantity of product
  const changeQuantity = (e, product) => {
    dispatch(updateCart({ id: product.id, quantity: +e.target.value }));
  };

  //delete product from cart
  const handleDelete = async (data) => {
    await dispatch(deleteItem(data.id));
    toast.success(`successfully removed ${data.product.title} from cart.`);
  };

  //select the address for delivery
  const handleSelectAddress = async (data) => {
    const update = { selectedAddress: data._id };
    await dispatch(updateUser({ user: data.user, address: update }));
    toast.success("Successfully Updated delivery address.");
    Cancel();
  };

  //update price total
  const updatePrice = () => {
    let totalPrice = 0,
      discount = 0;
    Products.forEach((p) => {
      totalPrice += Math.round(p.product.price * p.quantity);
      discount +=
        Math.round(p.product.price * (p.product.discountPercentage / 100)) *
        p.quantity;
    });

    setDiscount(discount);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    updatePrice();
  }, [Products]);

  const handlePostOrder = () => {
    if (paymentMethod === "cash") {
      navigate(`/order-success/${currentOrder.id}/success`, { replace: true });
    } else if (paymentMethod === "online") {
      setId(currentOrder.payment_session_id);
      startPayment(currentOrder.payment_session_id);
    }
  };

  useEffect(() => {
    if (currentOrder) handlePostOrder();
  }, [currentOrder]);

  //to close the address modal
  const Cancel = () => {
    setopenForm(false);
    setOpenModal(false);
  };

  //to handle the order
  const handleOrder = async () => {
    const order = {
      user: user._id,
      items: Products,
      priceDetails: {
        totalPrice: totalPrice,
        discount: discount,
        toPay: Math.round(totalPrice - discount),
      },
      address: user.selectedAddress,
    };

    // console.log(order);
    if (order.address === null || order.address === undefined) {
      toast.error("Please select the delivery address.");
      return;
    }

    if (paymentMethod === "cash") {
      order.paymentDetails = {
        method: "cash",
      };
      dispatch(createOrderAsync(order));
    } else if (paymentMethod === "online") {
      setOpenPayment(true);
      dispatch(createOrderAsync(order));
    } else {
      alert("Please Select Payment method");
    }
  };

  const verifyAndUpdateOrder = async (id) => {
    const res = await verifyPayment(id);
    const data = {
      id: id,
      update: {
        paymentDetails: { method: "online", details: res },
      },
    };
    dispatch(updateOrderAsync(data));
  };

  //to start the payment
  //TODO:this function should be called from outside the comoponent
  const startPayment = async (PaymentSessionId) => {
    let cashfree = new cashfreeSandbox.Cashfree(PaymentSessionId);

    const dropinConfig = {
      components: ["order-details", "card", "netbanking", "upi"],

      onSuccess: async function (data) {
        console.log("from success function");
        console.log("payment is successfull redirect");
        await verifyAndUpdateOrder(data.order.orderId);
        navigate(`/order-success/${data.order.orderId}/success`, {
          replace: true,
        });
      },

      onFailure: async function (data) {
        console.log("from failure function");
        console.log("payment is un-successfull redirect");
        await verifyAndUpdateOrder(data.order.orderId);
        navigate(`/order-success/${data.order.orderId}/failed`, {
          replace: true,
        });
      },

      style: {
        backgroundColor: "#ffffff",
        color: "#11385b",
        fontSize: "14px",
        fontFamily: "Lato",
        errorColor: "#ff0000",
        theme: "light",
      },
    };
    await cashfree.drop(document.getElementById("render"), dropinConfig);
  };

  const handleVerification = ({ token, ekey }) => {
    setCashButton(false);
    // const res = await fetch('https://hcaptcha.com/siteverify', {
    //     method: 'POST',
    //     body: `response=${token}&secret=${0x8171E921A369E0597d81D4118494eAd94dbc9340}`,
    //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // })
    // const data = await res.json();
    // console.log(data)
  };

  return (
    <>
      <div className="main p-5">
        {/* <div className='upper-main'> */}
        <div className="w-full grid grid-cols-6 gap-4 md:px-32">
          {/* Left side section */}
          <div className="col-span-6 lg:col-span-4">
            {/* Login Details */}
            <div className="left-child bg-white shadow">
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
            <div className="left-child bg-white shadow">
              {/* Upper button to select or add address */}
              <div className="flex justify-between items-center">
                <div>
                  <h1>Delivery Address ✔</h1>
                </div>
                <div>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800"
                  >
                    {" "}
                    Change
                  </button>
                </div>
              </div>

              {/* Modal */}
              <Modal
                show={openModal}
                size={"lg"}
                onClose={() => setOpenModal(false)}
              >
                <Modal.Header>
                  {openForm ? "Add New Address" : "Select From Saved Addresses"}
                </Modal.Header>
                {authStatus === STATUS.LOADING ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="flex h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Modal.Body>
                      {openForm ? (
                        <AddressInputFrom Cancel={Cancel} />
                      ) : (
                        <AddressList
                          addresses={user.addresses}
                          handleSelectAddress={handleSelectAddress}
                          setOpenModal={setOpenModal}
                        />
                      )}
                    </Modal.Body>

                    {!openForm && (
                      <Modal.Footer>
                        <Button onClick={() => setopenForm(true)}>
                          Add New Address
                        </Button>
                      </Modal.Footer>
                    )}
                  </>
                )}
              </Modal>

              <hr />

              <div className="d-address ">
                <div className="inner-address">
                  {user.selectedAddress ? (
                    <div className="d-address">
                      <h1 className="font-bold">
                        {user.selectedAddress?.fullName}
                      </h1>
                      {user.selectedAddress?.streetAddress}
                      <p>
                        {user.selectedAddress?.city},{" "}
                        {user.selectedAddress?.state} -{" "}
                        {user.selectedAddress?.pinCode}
                      </p>
                      <h5> Phone: {user.selectedAddress?.phoneNumber}</h5>
                    </div>
                  ) : (
                    <h1>Please select or add new address for delivery.</h1>
                  )}
                </div>
              </div>
            </div>

            <br></br>

            {/* Order Summary */}
            <div className="left-child bg-white shadow">
              <div className="flex justify-between items-center">
                <div>
                  {showSummary ? (
                    <h1>Edit Order</h1>
                  ) : (
                    <div>
                      <h1>Order Summary ✔ </h1>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSummary(!showSummary);
                    }}
                    className="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800"
                  >
                    {showSummary ? "Hide" : "View"}
                  </button>
                </div>
              </div>

              {showSummary && (
                <div>
                  <hr />
                  <div className="flex h-full flex-col ">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="mt-2">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className={`-my-6 divide-y divide-gray-200 ${
                              cartStatus === STATUS.LOADING &&
                              "blur-sm animate-pulse"
                            }`}
                          >
                            {Products.length === 0 && (
                              <Navigate to="/shop-all" />
                            )}
                            {Products.map((p) => (
                              <li key={p.product.id} className="flex py-6">
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
                                        <Link
                                          to={`/product-detail/${p.product.id}`}
                                        >
                                          {p.product.title}
                                        </Link>
                                      </h3>
                                      <div className="flex  flex-col">
                                        <p className="ml-4">
                                          ₹
                                          {Math.round(
                                            p.product.price -
                                              p.product.price *
                                                (p.product.discountPercentage /
                                                  100)
                                          ) * p.quantity}
                                          ({p.quantity}kgs)
                                        </p>
                                        <p className="ml-4 tracking-tight text-gray-900 line-through">
                                          ₹
                                          {Math.round(
                                            p.quantity * p.product.price
                                          )}
                                          ({p.quantity}kgs)
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div>
                                      <label
                                        htmlFor="quantity"
                                        className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Qty :
                                      </label>
                                      <select
                                        style={{
                                          border: "1px solid grey",
                                          borderRadius: "10px",
                                        }}
                                        className="inline  text-md font-medium text-gray-900"
                                        onChange={(e) => changeQuantity(e, p)}
                                        value={p.quantity}
                                      >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                      </select>
                                    </div>
                                    <div className="flex">
                                      <button
                                        onClick={() => handleDelete(p)}
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
                    </div>
                  </div>
                </div>
              )}
            </div>

            <br />
            {/* Payment Method */}
            <div className="left-child bg-white shadow">
              <h1>Select Payment Mode</h1>
              <hr />
              <div className="flex justify-between mt-3 space-y-6">
                <div className="space-y-6 p-2">
                  <div className="flex flex-col  gap-y-5">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="online"
                        name="payments"
                        type="radio"
                        checked={paymentMethod === "online"}
                        value="online"
                        className="h-4 w-4 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="online"
                        checked
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Pay Now
                      </label>
                    </div>

                    {paymentMethod === "online" && (
                      <div
                        className={`ml-10 flex block cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700`}
                        onClick={handleOrder}
                      >
                        Place Order
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-5">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        type="radio"
                        value="cash"
                        className="h-4 w-4 cursor-pointer  border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked={paymentMethod === "cash"}
                        onChange={async (e) => {
                          setPaymentMethod(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash On Delivery
                      </label>
                    </div>

                    {paymentMethod === "cash" && (
                      <div className="md:flex overflow-x-hidden items-center">
                        <HCaptcha
                          className="border "
                          sitekey="6db06f65-536e-4d2c-8dc0-7a5767fbeb90"
                          onVerify={(token, ekey) =>
                            handleVerification(token, ekey)
                          }
                        />
                        <br />
                        <button
                          disabled={
                            cashButton || orderStatus === STATUS.LOADING
                          }
                          className={` md:ml-10 w-full flex block cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700  ${
                            (cashButton || orderStatus === STATUS.LOADING) &&
                            "cursor-not-allowed bg-indigo-500 text-white font-bold py-2 px-4 rounded opacity-50 "
                          }`}
                          onClick={handleOrder}
                        >
                          Place Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side section */}
          <div
            className="col-span-5  lg:col-span-2 "
            style={{
              width: "129%",
            }}
          >
            <div className={`left-child bg-white shadow`}>
              <h1
                style={{
                  color: "#5c5959",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                className="mt-2 ml-5 mb-2"
              >
                Price Details
              </h1>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="main-2">
                  <div
                    className={`${
                      cartStatus === STATUS.LOADING && "blur-sm animate-pulse"
                    }`}
                  >
                    <div className="inner-price font-medium text-gray-900">
                      <p>Price ({Products.length} items)</p>
                      <p>₹{totalPrice}</p>
                    </div>

                    <div className="inner-price font-medium text-gray-900">
                      <p>Discount</p>
                      <p
                        style={{
                          color: "#388e3c",
                          fontWeight: "bold",
                        }}
                      >
                        -₹{discount}
                      </p>
                    </div>

                    <div className="inner-price font-medium text-gray-900">
                      <p>Delivery Charges</p>
                      <p>Free</p>
                    </div>

                    <hr />

                    <div className="final-amount font-medium text-gray-900">
                      <p>Total Amount</p>
                      <p>₹{Math.round(totalPrice - discount)}</p>
                    </div>

                    <hr />

                    <div className="mt-5 mb-10">
                      <p
                        style={{
                          color: "#388e3c",
                          fontWeight: "bold",
                        }}
                      >
                        You will save ₹{discount} on this order
                      </p>
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
      <Modal
        show={openPayment}
        size={"lg"}
        onClose={() => setOpenPayment(false)}
      >
        <div className="overflow-hidden p-2">
          {!id && (
            <Modal.Body className="flex flex-col justify-center items-center text-xl  gap-y-5 ">
              <h1>Loading Payment Gateway</h1>
              <h2> Please do not close or refresh this page.</h2>
              <Loader></Loader>
            </Modal.Body>
          )}
          <div id="render" className="overflow-x-hidden">
            {" "}
          </div>
        </div>
      </Modal>
    </>
  );
}

function AddressList({ addresses, handleSelectAddress, setOpenModal }) {
  return (
    <>
      <div>
        <div className="flex h-full flex-col ">
          <div className="flex-1 overflow-y-auto py-3 sm:px-6">
            <div>
              <div className="flow-root">
                {addresses.length > 0 ? (
                  addresses.map((address, index) => (
                    <>
                      <AddressDetail address={address} />
                    </>
                  ))
                ) : (
                  <h1>You dont have any address.Please add new address.</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
