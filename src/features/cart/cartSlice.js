import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { status } from '../../app/constants'
const initialState = {
    cartProducts: [],
    status: status.ideal
}


//function to get all the cart items
const getCartItemsApi = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/` + id);
    const data = await res.json()
    return data.items;
}


// function to add product to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product) => {
        const items = await getCartItemsApi(product.user);
        items.push(product);
        const data = {
            items: items
        }
        const push = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/` + product.user, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        })
        return product;
    }
)

//fetch all cart items for specific user
export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (userId) => {
        const res = await getCartItemsApi(userId)
        return res;
    }
)

//update the quantity of item in cart
export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async (product) => {
        const items = await getCartItemsApi(product.user);

        const index = items.findIndex((item) => item.id === product.id)
        items[index] = product;
        const data = {
            items: items
        }
        const up = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/` + product.user, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        })
        const cart = await up.json();

        return product;
    }
)

//to delete the particular item in cart
export const deleteItem = createAsyncThunk(
    'cart/deleteItem',
    async (product) => {
        const items = await getCartItemsApi(product.user);

        const index = items.findIndex((item) => item.id === product.id)

        items.splice(index, 1);

        const data = {
            items: items
        }
        const del = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/` + product.user, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        })
        return product.id;
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = status.loading
            })
            .addCase(addToCart.fulfilled, (state, action) => {

                state.cartProducts.push(action.payload);
                state.status = status.ideal
            })
            .addCase(getCartItems.pending, (state) => {
                state.status = status.loading
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cartProducts = action.payload;
                state.status = status.ideal
            })
            .addCase(updateCart.pending, (state) => {
                state.status = status.loading
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.status = status.ideal
                const index = state.cartProducts.findIndex(item => item.id === action.payload.id)
                state.cartProducts[index] = action.payload;
            })
            .addCase(deleteItem.pending, (state) => {
                state.status = status.loading
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.status = status.ideal

                const index = state.cartProducts.findIndex(item => item.id === action.payload)
                state.cartProducts.splice(index, 1);
            })
    }

})

export default cartSlice.reducer

export const selectCartProducts = (state) => state.cart.cartProducts
export const selectCartCount = (state) => state.cart.cartProducts.length;
export const selectCartStatus = (state) => state.cart.status