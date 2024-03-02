export async function createUserAPi(data) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users?email=${data.email}`
    );
    const user = await res.json();

    if (user.length !== 0) {
      return new Promise((resolve, reject) => {
        reject({
          user: null,
          message:
            "User with this email already exist.Please,use another email.",
        });
      });
    }
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const d = await response.json();

    // console.log(d);
    //creating user's cart
    const cart = {
      id: d.id,
      items: [],
    };
    const createCart = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/cart/`,
      {
        method: "POST",
        body: JSON.stringify(cart),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const c = await createCart.json();
    console.log(c);
    return new Promise((resolve, reject) => {
      resolve({ user: d, message: "User registered successfully" });
    });
  } catch (err) {
    console.log(err);
  }
}

export async function loginUserApi(data) {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/users?email=${data.email}`
  );
  const users = await res.json();
  if (users.length !== 0) {
    if (users[0].password !== data.password) {
      return new Promise((resolve, reject) => {
        reject({ user: null, message: "InValid Credentials" });
      });
    }
    return new Promise((resolve, reject) => {
      resolve({ data: users[0] });
    });
  } else {
    return new Promise((resolve, reject) => {
      reject({ user: null, message: "No User with this E-mail." });
    });
  }
}

export async function updateUserApi(data) {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${data.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    }
  );
  const user = await res.json();
  // console.log(user)
  return new Promise((resolve) => {
    resolve({ data: user });
  });
}
