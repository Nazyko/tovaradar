import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ProductData } from "../types/type";

interface ICart {
    id: number;
    products: ProductData[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

interface CartProductsResponse {
    carts: ICart[];
    total: number;
    skip: number;
    limit: number;
}

export const getCartProducts = createAsyncThunk(
    'cart/getCartProducts', 
    async (id: number, thunkAPI) => {
        try {
            const response = await axios.get<CartProductsResponse>(`https://dummyjson.com/carts/user/${id}`)
            return response.data                    
        }
        catch(error) {
            const axiosError = error as AxiosError;
            return thunkAPI.rejectWithValue(
                axiosError.response?.data || "Failed to fetch cart products"
            );
        }
    }
)

type CartState = {
    carts: ICart[];
    total: number | null;
    skip: number | null;
    limit: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    carts: [],
    total: null,
    skip: null,
    limit: null,
    loading: false,
    error: null,
}

const cartSlice = createSlice({
    name: 'cart', 
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartProducts.pending,  (state) => {
                state.loading = true;
            })
            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.carts = action.payload.carts
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

function isError(action: AnyAction): boolean {
    return action.type.endsWith('rejected');
}

export default cartSlice.reducer;