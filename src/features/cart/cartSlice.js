import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCartItemsApi,addCartItemApi, updateCartItemApi, deleteCartItemApi, resetCartApi} from "./cartApi"
import { STATUS } from '../../app/constants'
const initialState = {
    cartProducts: [],
    error:null,
    status: STATUS.IDEAL
}

// function to add product to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product) => {
        const res = await addCartItemApi(product)
        return res;
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
    async (data) => {
        const res = await updateCartItemApi(data); 
        return res;
    }
)

//to delete the particular item in cart
export const deleteItem = createAsyncThunk(
    'cart/deleteItem',
    async (id) => {
        const res = await deleteCartItemApi(id); 
        return res;
    }
)


//to reset the cart
export const resetCartAsync = createAsyncThunk(
    'cart/resetCartAsync', 
    async (id) => {
        const res = await resetCartApi(id); 
        return res;
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
                state.cartProducts.push(action.payload.data);
                state.status = STATUS.IDEAL
            })
            .addCase(addToCart.rejected, (state) => {
                state.status = STATUS.ERROR
            })
 

            .addCase(getCartItems.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cartProducts = action.payload.products;
                state.status = STATUS.IDEAL
            })
            .addCase(getCartItems.rejected, (state,action) => {
                state.error = action.error.message;
                state.status = STATUS.ERROR;
            })


            .addCase(updateCart.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                //action.payload.data.id
                const { id,quantity} = action.payload.data; 
                const index = state.cartProducts.findIndex(p => p.id === id) 
                if(index>=0){
                    state.cartProducts[index].quantity = quantity;
                }
                state.status = STATUS.IDEAL
            })


            .addCase(deleteItem.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                console.log(action.payload)
                const index = state.cartProducts.findIndex(item => item.id === action.payload.data)
                state.cartProducts.splice(index, 1);
                
                state.status = STATUS.IDEAL

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