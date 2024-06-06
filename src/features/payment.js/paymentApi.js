
import { cashfreeSandbox } from "cashfree-pg-sdk-javascript";

export const startPayment = async (PaymentSessionId) => {
    let cashfree = new cashfreeSandbox.Cashfree(PaymentSessionId);

    const dropinConfig = {
        
        components: [
            "order-details",
            "card",
            "netbanking",
            "upi",
        ],

        onSuccess: async function (data) {
            console.log('from success function')
            console.log(data);
            console.log("payment is successfull redirect")
           
            
            const paymentDetails = await getPaymentStatus(data.order.orderId)
            // console.log(paymentDetails)
            const update = { ...paymentDetails, transaction_data: data }



            //update the order after verifing the payment
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
            console.log('from failure function')
            console.log(data);
            console.log("payment is un-successfull redirect")
            /*
            const paymentDetails = await getPaymentStatus(data.order.orderId)
            // console.log(paymentDetails)
            const update = { ...paymentDetails, transaction_data: data }
            const up = await updateOrder(data.order.orderId, update)
            // console.log('updated order')
            // console.log(up)
            navigate(`/order-success/${data.order.orderId}/failed`, { replace: true })
            */
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


export const verifyPayment = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pay/verify-order`+id);
    const d = await response.json(); 
    return d;
}

