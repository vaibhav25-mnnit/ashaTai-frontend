import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../app/constants";
import { createOrder, getOrderById, getOrders } from "./orderApi";

const initialState = {
    orders: [],
    currentOrder: null,
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

//to get all the orders
export const getOrdersAsync = createAsyncThunk(
    'order/getOrdersAsync',
    async (id) => {
        const res = await getOrders(id);
        return res;
    }
)


//to get one order by id
export const getOrderByIdAsync = createAsyncThunk(
    'order/getOrderByIdAsync',
    async (id) => {
        const res = await getOrderById(id);
        console.log(res)
        return res
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
                state.currentOrder = action.payload
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
    }
})




export default orderSlice.reducer;

export const { resetCurrentOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOreder = (state) => state.order.currentOrder;
export const selectOrderStatus = (state) => state.order.status
