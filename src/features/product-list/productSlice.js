
import { ITEMS_PER_PAGE } from "../../app/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    totalProducts: 0,
    status: 'ideal',
    categories: [],
    brands: [],
    selectedProduct: null
}


//intial function to get all productss
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (page) => {
        const res = await fetch(`http://localhost:8080/products?_page=${page}&_limit=${ITEMS_PER_PAGE}`);
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
            const res = await fetch(`http://localhost:8080/products?_page=1&_limit=10`);
            const d = await res.json();
            const totalProducts = await res.headers.get('X-total-Count')
            return { products: d, totalProducts: totalProducts };
        }
        const res = await fetch(`http://localhost:8080/products?` + queryString)
        const d = await res.json();
        const totalProducts = await res.headers.get('X-total-Count')
        return { products: d, totalProducts: totalProducts };
    }
)


//to get all the brands
export const getBrands = createAsyncThunk(
    'products/getBrands',
    async () => {
        const res = await fetch(`http://localhost:8080/brands`);
        const d = await res.json();
        return d;
    }
)

//to get all the categories
export const getCategories = createAsyncThunk(
    'products/getCategories',
    async () => {
        const c = await fetch('http://localhost:8080/categories')
        const d = await c.json();

        return d;
    }
)

//to get the selected product
export const getSelectedProduct = createAsyncThunk(
    'products/getSelectedProduct',
    async (id) => {
        const p = await fetch(`http://localhost:8080/products/${id}`);
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
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'ideal';
                state.products = action.payload.products;
                state.totalProducts = action.payload.totalProducts;
            })
            .addCase(getProducts.rejected, (state) => {
                state.status = 'error';
            })

            .addCase(getFilteredProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getFilteredProducts.fulfilled, (state, action) => {
                state.status = 'ideal';
                state.products = action.payload.products;
            })
            .addCase(getFilteredProducts.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.status = 'ideal';
                state.brands = action.payload;

            })
            .addCase(getBrands.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.status = 'ideal';
                state.categories = action.payload;

            })
            .addCase(getCategories.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(getSelectedProduct.fulfilled, (state, action) => {
                state.status = 'ideal';
                state.selectedProduct = action.payload;

            })
            .addCase(getSelectedProduct.rejected, (state) => {
                state.status = 'error';
            })

    }
})



export const { sortProducts } = productsSlice.actions;


export default productsSlice.reducer;