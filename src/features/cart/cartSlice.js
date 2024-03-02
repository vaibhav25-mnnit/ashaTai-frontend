import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { STATUS } from '../../app/constants'
const initialState = {
    cartProducts: [],
    status: STATUS.IDEAL
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
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/` + product.user, {
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
        await up.json();

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
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/` + product.user, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        })
        return product.id;
    }
)


//to reset the cart
export const resetCartAsync = createAsyncThunk(
    'cart/resetCartAsync',
    async (userId) => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/` + userId, {
            method: "PATCH",
            body: JSON.stringify({ items: [] }),
            headers: { 'content-type': 'application/json' },
        })

        const d = await res.json();
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetCart: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(addToCart.fulfilled, (state, action) => {

                state.cartProducts.push(action.payload);
                state.status = STATUS.IDEAL
            })
            .addCase(addToCart.rejected, (state) => {
                state.status = STATUS.ERROR
            })




            .addCase(getCartItems.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cartProducts = action.payload;
                state.status = STATUS.IDEAL
            })
            .addCase(getCartItems.rejected, (state) => {
                state.status = STATUS.ERROR
            })




            .addCase(updateCart.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.status = STATUS.IDEAL
                const index = state.cartProducts.findIndex(item => item.id === action.payload.id)
                state.cartProducts[index] = action.payload;
            })

            .addCase(deleteItem.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.status = STATUS.IDEAL

                const index = state.cartProducts.findIndex(item => item.id === action.payload)
                state.cartProducts.splice(index, 1);
            })

            .addCase(resetCartAsync.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(resetCartAsync.fulfilled, (state) => {
                return initialState;
            })
    }

})
export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer

export const selectCartProducts = (state) => state.cart.cartProducts
export const selectCartCount = (state) => state.cart.cartProducts.length;
export const selectCartStatus = (state) => state.cart.status