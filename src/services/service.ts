import axios from "axios"
import { AuthRequest, CategoryListResponse, GetProductsByCategoryResponse, GetProductsResponse, IUser } from "../types/type"

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
