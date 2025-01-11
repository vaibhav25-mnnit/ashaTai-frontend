import { ITEMS_PER_PAGE } from "../../app/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../app/constants";

const initialState = {
  products: [],
  totalProducts: 0,
  status: STATUS.IDEAL,
  categories: [],
  selectedProduct: null,
};

//TODO: move api calles to separate file and rename slices as async

//add product
export const addProductAsync = createAsyncThunk(
  "products/addProductAsync",
  async (data) => {
    // console.log(data);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/add`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const d = await response.json();
    console.log(d);
    return d;
  }
);

//intial function to get all productss
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ filter, page }) => {
    let queryString = "";
    console.log(filter);
    filter.forEach((f) => {
      queryString += `${f.section}=${f.value}&`;
    });

    // console.log(queryString);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/all?_page=${page}&_limit=${ITEMS_PER_PAGE}&` +
        queryString
    );
    const d = await res.json();
    const totalProducts = await res.headers.get("X-total-Count");
    return { products: d, totalProducts: totalProducts };
  }
);
//to get all the categories
export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    const c = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/all`);
    const d = await c.json();

    return d;
  }
);

//to get the selected product
export const getSelectedProduct = createAsyncThunk(
  "products/getSelectedProduct",
  async (id) => {
    const p = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/getProduct/${id}`
    );
    const d = p.json();
    return d;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProducts: (state, action) => {
      state.products = action.payload;
    },
    resetProducts: () => {
      return initialState;
    },
    resetSelectedProducts: () => {
      return { ...initialState, selectedProduct: null };
    },
    updateFilter: (state, action) => {
      const { id } = action.payload;
      const productIndex = state.categories.findIndex(
        (product) => product._id === id
      );
      if (productIndex !== -1) {
        state.categories[productIndex].checked =
          !state.categories[productIndex].checked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = STATUS.IDEAL;
      })

      .addCase(getProducts.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = STATUS.IDEAL;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = STATUS.ERROR;
      })

      .addCase(getCategories.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = STATUS.IDEAL;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.status = STATUS.ERROR;
      })

      .addCase(getSelectedProduct.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getSelectedProduct.fulfilled, (state, action) => {
        state.status = STATUS.IDEAL;
        state.selectedProduct = action.payload;
      })
      .addCase(getSelectedProduct.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {
  sortProducts,
  resetProducts,
  resetSelectedProducts,
  updateFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
