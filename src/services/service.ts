import axios from "axios"
import { AuthRequest, CategoryListResponse, GetProductsByCategoryResponse, GetProductsResponse, ICart, IUser, RefreshTokenResponse, UsersProps } from "../types/type"

const URL = 'https://dummyjson.com/products?'

export const getProducts = async (limit: number, skip: number) => {
    const response = await axios.get<GetProductsResponse>(`${URL}`+ `limit=${limit}&skip=${skip}`)
    return response.data.products
}

export const getCategories = async () => {
    const response = await axios.get<CategoryListResponse[]>(`https://dummyjson.com/products/categories`)
    return response.data
}

export const getProductsByCategory = async (category: string | undefined) => {
    const response = await axios.get<GetProductsByCategoryResponse>(`https://dummyjson.com/products/category/${category}`)
    return response.data
}

export const loginUser = async (credentials: AuthRequest) => {
    const response = await axios.post<IUser>(`https://dummyjson.com/auth/login`, credentials, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.data
}

export const refreshToken = async () => {
    const currentToken = localStorage.getItem('refreshToken')
    if (!currentToken) throw new Error("No refresh token available")

    const response = await axios.post<RefreshTokenResponse>('https://dummyjson.com/auth/refresh', {
        refreshToken: `${currentToken}`,
        expiresInMins: 30,
    })

    return response.data
}

export const getMe = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) throw new Error('Access token is missing');
    const response = await axios.get<UsersProps>(
        'https://dummyjson.com/auth/me',
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }   
    );
    return response.data;
};

export const getCartProducts = async (id: number) => {
    const response = await axios.get<ICart>(`https://dummyjson.com/carts/user/${id}`)
    return response.data
}

