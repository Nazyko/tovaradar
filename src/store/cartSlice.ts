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
}

const initialState: CartState = {
    carts: [],
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
                state.error = null
            })

            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.carts = action.payload.carts ?? [];
            })

            .addCase(addCartProducts.pending, (state) => {
                state.error = null
                state.loading = true
            })

            .addCase(addCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            
                const cart = action.payload;                
            
                const newCart: ICart = {
                    id: cart.id,
                    userId: cart.userId,
                    products: cart.products,
                    total: cart.total,
                    discountedTotal: cart.discountedTotal ?? 0, 
                    totalProducts: cart.totalProducts,
                    totalQuantity: cart.products.reduce((sum, product) => sum + product.quantity, 0),
                };
            
                state.carts.push(newCart);
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
                state.carts = state.carts.filter(cart => cart.id !== action.payload);
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