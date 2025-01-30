import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CartProducts, CartProductsRequest, CartProductsResponse, ICart, Product } from "../types/Cart";

type CartState = {
    carts: ICart[];
    products: CartProducts[];
    total: number | null;
    skip: number | null;
    limit: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    carts: [],
    products: [],
    total: null,
    skip: null,
    limit: null,
    loading: false,
    error: null,
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

export const addCartProducts = createAsyncThunk(
    'cart/addCartProducts', 
    async (credentials: CartProductsRequest, thunkAPI) => {
        try {
            const response = await axios.post<CartProductsResponse>(`https://dummyjson.com/carts/add`, credentials)
            return response.data                    
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message || 'Invalid credentials');
            }
            return thunkAPI.rejectWithValue('Network Error');
        }
    }
)

export const updateCartProducts = createAsyncThunk<
    CartProductsResponse,  
    { id: number, products: Product[] },
    { rejectValue: string } 
>(
    "cart/updateCartProducts",
    async ({ id, products }, thunkAPI) => {
        try {
            const response = await axios.put<CartProductsResponse>(
                `https://dummyjson.com/carts/${id}`,
                {
                    merge: true,
                    products: products,
                }
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            return thunkAPI.rejectWithValue(
                axiosError.response?.data?.message || "Failed to update cart"
            );
        }
    }
);

export const deleteCartProducts = createAsyncThunk(
    'cart/deleteCartProducts', 
    async (id: number, thunkAPI) => {
        try {
            const response = await axios.delete(`https://dummyjson.com/carts/${id}`)
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

const cartSlice = createSlice({
    name: 'cart', 
    initialState,
    reducers: {
        deleteCartProduct: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            state.carts = state.carts.map(cart => ({
                ...cart,
                products: cart.products.filter(product => product.id !== productId)
            }));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartProducts.pending, (state) => {
                state.loading = true;
            })

            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.carts = action.payload.carts
                state.products = action.payload.carts.flatMap(cart => cart.products)
            })

            .addCase(addCartProducts.pending, (state) => {
                state.error = null
                state.loading = true
            })

            .addCase(addCartProducts.fulfilled, (state, action) => {
                const newCarts = action.payload.carts; 
                if (Array.isArray(newCarts)) {
                    state.carts = [...state.carts, ...newCarts]; 
                }
                state.loading = false;  
                state.error = null;
            })

            .addCase(updateCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.carts = action.payload.carts; 
            })

            .addCase(deleteCartProducts.fulfilled, (state, action) => {
                const deletedProductId = action.payload; 
                state.carts = state.carts.map(cart => ({
                     ...cart,
                    products: cart.products.filter(product => product.id !== deletedProductId),
                }));
                state.loading = false;
            })

            .addCase(deleteCartProducts.rejected, (state, action) => {
                state.error = action.payload as string; 
                state.loading = false;
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

export const { deleteCartProduct } = cartSlice.actions

export default cartSlice.reducer;