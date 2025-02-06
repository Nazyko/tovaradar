import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CartProductsResponse, ICart, Product } from "../types/Cart";

type CartState = {
    carts: ICart[];
    total: number | null;
    skip: number | null;
    limit: number | null;
    loading: boolean;
    error: string | null;
    toaster: boolean;
}

const initialState: CartState = {
    carts: [],
    total: null,
    skip: null,
    limit: null,
    loading: false,
    error: null,
    toaster: false,
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

export const addCartProducts = createAsyncThunk<
    ICart, 
    { userId: number, products: Product[] },
    { rejectValue: string }
>(
    'cart/addCartProducts', 
    async ({userId, products}, {rejectWithValue}) => {
        try {
            const response = await axios.post<ICart>(`https://dummyjson.com/carts/add`, {
                userId: userId,
                products: products
            })
                        
            return response.data                    
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || 'Invalid credentials');
            }
            return rejectWithValue('Network Error');
        }
    }
)

export const updateCartProducts = createAsyncThunk<
    ICart,      
    { cartId: number, products: Product[] },
    { rejectValue: string } 
>(
    "cart/updateCartProducts",
    async ({ cartId, products }, { rejectWithValue }) => {
    
        try {
            const response = await axios.put<ICart>(`https://dummyjson.com/carts/${cartId}`, {
                merge: true,
                products: products,
            });
            
            return response.data;

        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(
                axiosError.response?.data?.message || "Failed to update cart"
            );
        }
    }
)

export const deleteCartProducts = createAsyncThunk(
    'cart/deleteCartProducts', 
    async (cartId: number, thunkAPI) => {
        try {
            const response = await axios.delete(`https://dummyjson.com/carts/${cartId}`)
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
        deleteCartItem: (state, action: PayloadAction<number>) => {
            state.carts = state.carts.map(cart => {
                const updatedProducts = cart.products.filter(product => product.id !== action.payload);
                const newTotal = updatedProducts.reduce((sum, p) => sum + p.total, 0);
                const newDiscountedTotal = updatedProducts.reduce((sum, p) => sum + (p.discountedTotal ?? 0), 0);
                const newTotalProducts = updatedProducts.length 
        
                return { 
                    ...cart, 
                    products: updatedProducts, 
                    total: newTotal, 
                    discountedTotal: newDiscountedTotal, 
                    totalProducts: newTotalProducts 
                };
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartProducts.pending, (state) => {
                state.loading = true;
                state.error = null
            })

            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.carts = action.payload.carts;
            })

            .addCase(addCartProducts.pending, (state) => {
                state.error = null
                state.loading = true
            })

            .addCase(addCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const userId = state.carts.map(cart => cart.userId === action.payload.userId);
                if (userId) {
                    state.carts.push(action.payload)                    
                }
                alert("Товар добавлено!")
            })

            .addCase(updateCartProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })            

            .addCase(updateCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const updatedCart = action.payload;
                const cartIndex = state.carts.findIndex(cart => cart.id === updatedCart.id);
                if (cartIndex !== -1) {
                    state.carts[cartIndex] = updatedCart;
                }
            })

            .addCase(deleteCartProducts.fulfilled, (state, action) => {
                const cartId = action.payload;
                state.carts = state.carts.filter(cart => cart.id !== cartId);
                state.loading = false;
                state.error = null
            })

            .addCase(deleteCartProducts.rejected, (state, action) => {
                state.error = action.payload as string; 
                state.loading = false;
                console.log(action.payload);
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

export const { deleteCartItem } = cartSlice.actions

export default cartSlice.reducer;