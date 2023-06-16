import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import productSlice from '../features/product-list/productSlice';

export const store = configureStore({
  reducer: {
    products: productSlice,
  },
});
