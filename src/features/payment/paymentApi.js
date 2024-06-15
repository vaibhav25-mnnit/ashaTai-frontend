export const verifyPayment = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/pay/verify-order/` + id
  );
  const d = await response.json();
  return d;
};
