import { ITEMS_PER_PAGE } from "../../app/constants";

export async function createOrder(data) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/pay/create-order`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const d = await response.json();
  return new Promise((resolve, reject) => {
    resolve(d);
  });
}

export async function getOrders({ page, id, query }) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/order/all/${id}?_page=${page}&_limit=${ITEMS_PER_PAGE}&` +
      query
  );
  const d = await response.json();
  const totalOrders = await response.headers.get("X-total-Count");
  return new Promise((resolve, reject) => {
    resolve({ orders: d, totalOrders: totalOrders });
  });
}

export async function getOrderById(id) {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/` + id);
  const d = await res.json();
  return new Promise((resolve, reject) => {
    resolve(d);
  });
}

export async function updateOrder({ id, update }) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/order/update/` + id,
    {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const d = await response.json();
  return new Promise((resolve, reject) => {
    resolve(d);
  });
}
