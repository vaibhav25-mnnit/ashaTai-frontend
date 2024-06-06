export async function createOrder(data) {

  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/pay/create-order`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const d = await response.json(); 
  return new Promise((resolve, reject) => {
    resolve(d)
  })

}

export async function getOrders(id) {

  // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders?user=` + user)

  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/all/`+id);
  const d = await response.json()
  return new Promise((resolve, reject) => {
    resolve(d)
  })

}

export async function getOrderById(id) {
  const res = await fetch('http://localhost:5000/order/' + id)
  const d = await res.json()
  return new Promise((resolve, reject) => {
    resolve(d)
  })
}

export async function updateOrder({id,update}) {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/update/`+id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const d = await response.json(); 
  return new Promise((resolve, reject) => {
    resolve(d)
  })
}