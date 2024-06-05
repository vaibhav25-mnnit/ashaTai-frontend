export const sentResetEmail = async ({email})=>{
    const c = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/sendResetMail?mail=`+email) 
    const d = await c.json(); 
    return d;
}

export const changePassword = async (data)=>{ 
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/resetPassword`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
    }) 
    const d = await res.json(); 
    return d;
}