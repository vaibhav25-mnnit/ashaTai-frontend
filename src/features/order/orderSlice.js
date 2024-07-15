import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../app/constants";
import { createOrder, getOrderById, getOrders, updateOrder } from "./orderApi";
import { orderStatus } from "../../app/constants";
const initialState = {
  orderFilter: [
    {
      id: "status",
      name: "Order Status",
      options: [
        {
          value: orderStatus.pending,
          label: orderStatus.pending,
          checked: false,
        },
        {
          value: orderStatus.Confirmed,
          label: orderStatus.Confirmed,
          checked: false,
        },
        {
          value: orderStatus.Delivered,
          label: orderStatus.Delivered,
          checked: false,
        },
        {
          value: orderStatus.Cancelled,
          label: orderStatus.Cancelled,
          checked: false,
        },
      ],
    },
    {
      id: "year",
      name: "Order year",
      options: [
        { value: "2024", label: "2024", checked: false },
        { value: "2023", label: "2023", checked: false },
        { value: "2022", label: "2022", checked: false },
        { value: "2021", label: "2021", checked: false },
      ],
    },
  ],
  orders: [],
  totalOrders: 0,
  currentOrder: null,
  status: STATUS.IDEAL,
};

//Api to create new order
export const createOrderAsync = createAsyncThunk(
  "order/createOrderAsync",
  async (data) => {
    const response = await createOrder(data);
    return response;
  }
);

//to get all the orders of a user with passed ids
export const getOrdersAsync = createAsyncThunk(
  "order/getOrdersAsync",
  async ({ filter, page, id }) => {
    let queryString = "";
    //console.log(filter);
    filter.forEach((f) => {
      queryString += `${f.section}=${f.value}&`;
    });

    // console.log(queryString);
    const res = await getOrders({ page: page, id: id, query: queryString });
    return res;
  }
);

//to get a specific order of a passed idds
export const getOrderByIdAsync = createAsyncThunk(
  "order/getOrderByIdAsync",
  async (id) => {
    const res = await getOrderById(id);
    console.log(res);
    return res;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrderAsync",
  async (data) => {
    const res = await updateOrder(data);
    console.log(res);
    return res;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetCurrentOrder: () => {
      return { ...initialState, currentOrder: null };
    },
    resetOrders: () => {
      return initialState;
    },
    updateOrderFilter: (state, action) => {
      // "status","year"
      console.log(action.payload);
      const filterIndex = state.orderFilter.findIndex(
        (filter) => filter.id === action.payload.section
      );
      if (filterIndex !== -1) {
        const optionIndex = state.orderFilter[filterIndex].options.findIndex(
          (option) => option.value === action.payload.value
        );

        if (optionIndex !== -1) {
          state.orderFilter[filterIndex].options[optionIndex].checked =
            !state.orderFilter[filterIndex].options[optionIndex].checked;
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.currentOrder = action.payload.data;
        state.status = STATUS.IDEAL;
      })

      .addCase(getOrdersAsync.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.status = STATUS.IDEAL;
      })

      .addCase(getOrderByIdAsync.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getOrderByIdAsync.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.status = STATUS.IDEAL;
      })

      .addCase(updateOrderAsync.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.currentOrder = action.payload.data;
        state.status = STATUS.IDEAL;
      });
  },
});

export default orderSlice.reducer;

export const { resetCurrentOrder, updateOrderFilter, resetOrders } =
  orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOreder = (state) => state.order.currentOrder;
export const selectOrderStatus = (state) => state.order.status;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectOrdersFilter = (state) => state.order.orderFilter;
