// import React, { useState } from 'react'
// import { load } from '@cashfreepayments/cashfree-js'

// import { cashfreeSandbox } from "cashfree-pg-sdk-javascript";
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';



// function CashFreePayment() {

//     const navigate = useNavigate()
//     const sessionId = 'session_3rj55QuaNELGycNpLT92xFnwN0bXBS1oygTinpey5rPP2Vhnc9WctlEjUEvd4ARf4wPpsTvi4K3Aikm_HLgxHEA9o6naMy9kY0QovIb5DMb9'

//     const [p, setP] = useState('cash')
//     const startCheckout = async () => {

//         const cashfree = await load({
//             mode: 'sandbox'
//         })

//         let checkoutOptions = {
//             paymentSessionId: sessionId,
//             returnUrl: "http://localhost:3000/order-success/{order_id}",
//             redirectTarget: '_parent'

//         }
//         const res = await cashfree.checkout(checkoutOptions)

//         if (res.error) {
//             console.log(res.error.message)
//         }

//         if (res.redirect) {
//             console.log('redirect')
//         }
//     }



//     const startPayment = () => {
//         const paymentSessionId = sessionId;
//         let cashfree = new cashfreeSandbox.Cashfree(paymentSessionId);

//         const dropinConfig = {
//             components: [
//                 "order-details",
//                 "card",
//                 "netbanking",
//                 "upi",
//             ],
//             onSuccess: function (data) {
//                 console.log(data);
//                 if (data.order.status === 'PAID' && data.transaction.txStatus === "SUCCESS") {
//                     console.log("payment is successfull redirect")
//                     navigate(`/order-success/${data.order.orderId}`, { replace: 'true' })
//                 }
//             },
//             onFailure: function (data) {
//                 console.log(data);
//                 if (data.order.status === 'ERROR') {
//                     alert(data.order.message)
//                 }

//                 if (data.order.status === 'ACTIVE' && data.transaction.txStatus === "FAILED") {
//                     console.log("payment falied show alert.")
//                     alert("Transaction failed try using another payment method")
//                 }
//             },
//             style: {
//                 backgroundColor: "#ffffff",
//                 color: "#11385b",
//                 fontSize: "14px",
//                 fontFamily: "Lato",
//                 errorColor: "#ff0000",
//                 theme: "light",
//             }
//         }
//         cashfree.drop(document.getElementById("render"), dropinConfig);
//     }


//     useEffect(() => {
//         startPayment()
//     })

//     return (<>
//     </>
//         // <div>
//         //     <div>Loading the payment by cashfree.</div>
//         //     {/* <button onClick={startPayment}>Start payment</button> */}

//         //     <div className='flex justify-between gap-x-2 px-5 py-5' style={{
//         //         border: '2px solid red'
//         //     }}>
//         //         <div className='w-1/2 left-child bg-white shadow'>
//         //             <h1>Select Payment Mode</h1>
//         //             <hr />
//         //             <div className="mt-6 space-y-6">

//         //                 <div className="flex items-center gap-x-3">
//         //                     <input
//         //                         id="online"
//         //                         name="payments"
//         //                         type="radio"
//         //                         value='online'
//         //                         className="h-4 w-4 cursor-pointer  border-gray-300 text-indigo-600 focus:ring-indigo-600"
//         //                         checked={p === 'online'}
//         //                         onChange={async (e) => {
//         //                             setP('online')
//         //                             // startCheckout()
//         //                             startPayment()
//         //                         }}
//         //                     />
//         //                     <label
//         //                         htmlFor="cash"
//         //                         className="block text-sm font-medium leading-6 text-gray-900"
//         //                     >
//         //                         Pay Now
//         //                     </label>

//         //                 </div>


//         //                 <div className="flex items-center gap-x-3">
//         //                     <input
//         //                         id="cash"
//         //                         name="payments"
//         //                         type="radio"
//         //                         value='cash'
//         //                         className="h-4 w-4 cursor-pointer  border-gray-300 text-indigo-600 focus:ring-indigo-600"
//         //                         checked={p === 'cash'}
//         //                         onChange={async (e) => {
//         //                             setP('cash')
//         //                             startPayment()
//         //                         }}
//         //                     />
//         //                     <label
//         //                         htmlFor="cash"
//         //                         className="block text-sm font-medium leading-6 text-gray-900"
//         //                     >
//         //                         Cash On Delivery
//         //                     </label>

//         //                 </div>

//         //             </div>
//         //         </div>
//         //         <div id='render' className='w-1/2 h-full bg-white shadow border-5 bordr-green-500 shadow'>

//         //         </div>
//         //     </div>
//         // </div>
//     )
// }

// export default CashFreePayment