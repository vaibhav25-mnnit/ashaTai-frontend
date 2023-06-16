
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    status: 'ideal'
}


export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const res = await fetch('http://localhost:8080/products');
        const d = await res.json();
        return d;

    }
)

export const getFilteredProducts =
    createAsyncThunk(
        'products/getFilteredProducts',
        async (filter) => {
            let queryString = '';

            filter.forEach(f => {
                queryString += `${f.section}=${f.value}&`;
            });
            console.log(queryString)

            const res = await fetch('http://localhost:8080/products?' + queryString)
            const d = await res.json();
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
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state) => {
                state.status = 'erroe';
            })

            .addCase(getFilteredProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getFilteredProducts.fulfilled, (state, action) => {
                state.status = 'ideal';
                state.products = action.payload;
            })
            .addCase(getFilteredProducts.rejected, (state) => {
                state.status = 'error';
            })
    }
})



export const { sortProducts } = productsSlice.actions;


export default productsSlice.reducer;