import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    error: null,
    status: 'ideal',
}


//Api to create new user for signup page
export const createUser = createAsyncThunk(
    'auth/createUser',
    async (data) => {
        try {

            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users?email=${data.email}`)
            const user = await res.json();
            console.log(user)
            if (user.length !== 0) {
                return ({ user: null, message: "User with this email already exist.Please,use another email." })
            }
            const response = await fetch('http://localhost:8080/users', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const d = await response.json()

            console.log(d);
            //creating user's cart 
            const cart = {
                id: d.id,
                items: [],
            }
            const createCart = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/`, {
                method: "POST",
                body: JSON.stringify(cart),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const c = await createCart.json();
            console.log(c)
            return ({ user: d, message: "User registered successfully" })
        } catch (err) {
            console.log(err)
        }
    }
)


//Api to verify loging user for login page
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data) => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users?email=${data.email}`);
        const users = await res.json();
        if (users.length !== 0) {
            if (users[0].password !== data.password) {
                return ({ user: null, message: 'Invalid credentials' })
            }
            return ({ user: users[0], message: 'Loged In' })
        } else {
            return ({ user: null, message: 'No account with that email address.' })
        }

    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(createUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createUser.fulfilled, (state, action) => {
                console.log("payload:- " + action.payload)
                state.user = action.payload.user;
                state.error = action.payload.message;
                state.status = 'ideal'
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.error = action.payload.message;
                state.status = 'ideal'
            })
    }
})



export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;