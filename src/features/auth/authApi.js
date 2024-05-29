export async function createUserAPi(data) {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const response = await res.json(); 
  return new Promise((resolve,reject) => {
    if(response.data)
      return  resolve({ user: response.data,message: response.message });
    
    return reject( reject({
      user: null,
      message: response.message
    }))
});

}

export async function loginUserApi(data) {
 
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const response = await res.json();
   
    return new Promise((resolve,reject) => {
      if(response.data)
        return  resolve({ data: response.data });
      
      return reject( reject({
        user: null,
        message: response.message
      }))
  });
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
