
import { ITEMS_PER_PAGE } from "../../app/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../app/constants";

const initialState = {
    products: [],
    totalProducts: 0,
    status: STATUS.IDEAL,
    categories: [],
    brands: [],
    selectedProduct: null
}


//intial function to get all productss
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (page) => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products?_page=${page}&_limit=${ITEMS_PER_PAGE}`);
        const d = await res.json();
        const totalProducts = await res.headers.get('X-total-Count')

        return { products: d, totalProducts: totalProducts };
    }
)


//to get the filtered products
export const getFilteredProducts = createAsyncThunk(
    'products/getFilteredProducts',
    async (filter) => {
        let queryString = '';

        filter.forEach(f => {
            queryString += `${f.section}=${f.value}&`;
        });

        // console.log(queryString)
        if ((queryString === "")) {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products?_page=1&_limit=10`);
            const d = await res.json();
            const totalProducts = await res.headers.get('X-total-Count')
            return { products: d, totalProducts: totalProducts };
        }
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products?` + queryString)
        const d = await res.json();
        const totalProducts = await res.headers.get('X-total-Count')
        return { products: d, totalProducts: totalProducts };
    }
)


//to get all the brands
export const getBrands = createAsyncThunk(
    'products/getBrands',
    async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/brands`);
        const d = await res.json();
        return d;
    }
)

//to get all the categories
export const getCategories = createAsyncThunk(
    'products/getCategories',
    async () => {
        const c = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`)
        const d = await c.json();

        return d;
    }
)

//to get the selected product
export const getSelectedProduct = createAsyncThunk(
    'products/getSelectedProduct',
    async (id) => {
        const p = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`);
        const d = p.json();
        return d;
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        sortProducts: (state, action) => {
            state.products = action.payload;
        },
        resetProducts: () => {
            return initialState;
        },
        resetSelectedProducts: () => {
            return { ...initialState, selectedProduct: null }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = STATUS.IDEAL
                state.products = action.payload.products;
                state.totalProducts = action.payload.totalProducts;
            })
            .addCase(getProducts.rejected, (state) => {
                state.status = STATUS.ERROR;
            })

            .addCase(getFilteredProducts.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getFilteredProducts.fulfilled, (state, action) => {
                state.status = STATUS.IDEAL;
                state.products = action.payload.products;
            })
            .addCase(getFilteredProducts.rejected, (state) => {
                state.status = STATUS.ERROR;
            })


            .addCase(getBrands.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.status = STATUS.IDEAL;
                state.brands = action.payload;

            })
            .addCase(getBrands.rejected, (state) => {
                state.status = STATUS.ERROR;
            })



            .addCase(getCategories.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.status = STATUS.IDEAL
                state.categories = action.payload;

            })
            .addCase(getCategories.rejected, (state) => {
                state.status = STATUS.ERROR
            })


            .addCase(getSelectedProduct.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getSelectedProduct.fulfilled, (state, action) => {
                state.status = STATUS.IDEAL
                state.selectedProduct = action.payload;

            })
            .addCase(getSelectedProduct.rejected, (state) => {
                state.status = STATUS.ERROR
            })

    }
})



export const { sortProducts, resetProducts, resetSelectedProducts } = productsSlice.actions;


export default productsSlice.reducer;