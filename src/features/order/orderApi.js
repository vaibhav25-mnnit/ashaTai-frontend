
export async function createOrder(data) {

  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const d = await response.json()
  return new Promise((resolve, reject) => {
    resolve(d)
  })

}



export async function getOrders(user) {

  // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders?user=` + user)

  const response = await fetch('http://localhost:5000/order/all/64e4edf374e34b3d2365e054')
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