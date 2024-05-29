export async function getCartItemsApi(id){
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/get/` + id);
    const response = await res.json();

    return new Promise((resolve,reject)=>{
        if(res.status===200){
            return resolve({
                products:response
            })
        }

        return reject(reject({
            user: null,
            message: response.message
        }))
    })
}

export async function addCartItemApi(product){

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/add`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' },
    })
    const response = await res.json();
    
    return new Promise((resolve,reject)=>{
        if(res.status===200){
            return resolve({
                data:response.data,
                message:response.message
            })
        }

        return reject(reject({ 
            data:null,
            message: response.message
        }))
    })
}

export async function updateCartItemApi({id,quantity}){

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/update/` + id, {
        method: "PATCH",
        body: JSON.stringify({quantity:quantity}),
        headers: { 'content-type': 'application/json' },
    })

    const response = await res.json();


    return new Promise((resolve,reject)=>{
        if(res.status===200){
            return resolve({
                data:response
            })
        }

        return reject(reject({
            error:response
        }))
    })
}

export async function deleteCartItemApi(id){
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/delete/` + id, {
        method: "DELETE", 
    })

    const response = await res.json();

    return new Promise((resolve,reject)=>{
        if(res.status===200){
            return resolve({
                data:id
            })
        }

        return reject(reject({
            error:response,
            message:response.message
        }))
    })
}

export async function resetCartApi(id){
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/reset/` + id, {
        method: "DELETE", 
    })

    const response = await res.json();

    return new Promise((resolve,reject)=>{
        if(res.status===200){
            return resolve({
                data:id
            })
        }

        return reject(reject({
            error:response,
            message:response.message
        }))
    })

}