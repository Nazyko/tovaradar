import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductData, SearchProductsResponse } from "../types/type";

export const searchProducts = createAsyncThunk(
    'search/searchProducts',
    async (text: string, thunkAPI) => {
        try {
            const response = await axios.get<SearchProductsResponse>(`https://dummyjson.com/products/search?q=${encodeURIComponent(text)}`)
            return response.data
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response || 'Invalid credentials')
            }
            return thunkAPI.rejectWithValue('Network Error');
        }
    }
)

type SearchState = {
    products: ProductData[];
    total: number | null;
    limit: number | null;
    skip: number | null;
    loading: boolean;
    error: unknown;
}

const initialState: SearchState = {
    products: [],
    total: null,
    limit: null,
    skip: null,
    loading: false,
    error: null,
}

const searchSlice = createSlice ({
    name: 'search',
    initialState, 
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            }) 
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export default searchSlice.reducer
