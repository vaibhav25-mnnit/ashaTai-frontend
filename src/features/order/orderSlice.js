import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../app/constants";
import { createOrder, getOrderById, getOrders, updateOrder } from "./orderApi";

const initialState = {
    orders: [],
    currentOrder: null,//currentOrder
    status: STATUS.IDEAL,
}


//Api to create new order
export const createOrderAsync = createAsyncThunk(
    'order/createOrderAsync',
    async (data) => {
        const response = await createOrder(data);
        return response;
    }
)

//to get all the orders of a user with passed ids
export const getOrdersAsync = createAsyncThunk(
    'order/getOrdersAsync',
    async (id) => {
        const res = await getOrders(id);
        return res;
    }
)


//to get a specific order of a passed idds
export const getOrderByIdAsync = createAsyncThunk(
    'order/getOrderByIdAsync',
    async (id) => {
        const res = await getOrderById(id);
        console.log(res)
        return res
    }
)

export const updateOrderAsync = createAsyncThunk(
    'order/updateOrderAsyncsaaaaaa',
    async (data) => {
        const res = await updateOrder(data);
        console.log(res)
        return res;
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetCurrentOrder: () => {
            return { ...initialState, currentOrder: null };
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => { 
                state.currentOrder = action.payload.data
                state.status = STATUS.IDEAL
            })


            .addCase(getOrdersAsync.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getOrdersAsync.fulfilled, (state, action) => {
                state.orders = action.payload
                state.status = STATUS.IDEAL
            })

            .addCase(getOrderByIdAsync.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getOrderByIdAsync.fulfilled, (state, action) => {
                state.currentOrder = action.payload
                state.status = STATUS.IDEAL
            })

            .addCase(updateOrderAsync.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(updateOrderAsync.fulfilled, (state, action) => {
                state.currentOrder = action.payload.data
                state.status = STATUS.IDEAL
            })
    }
})




export default orderSlice.reducer;

export const { resetCurrentOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOreder = (state) => state.order.currentOrder;
export const selectOrderStatus = (state) => state.order.status
