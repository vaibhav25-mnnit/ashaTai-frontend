import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../app/constants"; 

const initialState = {
    sessionId: null,
    paymentInfo: null,
    status: STATUS.IDEAL,
}


// Api to get the payment session id from backend
export const getSessionIdAsync = createAsyncThunk(
    'payment/getSessionIdAsync',
    async (id) => { 
        return id;
    }
)




const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        resetPayment: () => {
            return initialState;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getSessionIdAsync.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getSessionIdAsync.fulfilled, (state, action) => {
                state.sessionId = action.payload;
                state.status = STATUS.IDEAL
            })
            .addCase(getSessionIdAsync.rejected, (state) => {
                state.status = STATUS.ERROR
            })
    }
})





export default paymentSlice.reducer;


export const { resetPayment } = paymentSlice.actions

export const selectPaymentStatus = (state) => state.payment.status;
export const selectPaymentInfo = (state) => state.payment.paymentInfo
export const selectPaymentSessionId = (state) => state.payment.sessionId