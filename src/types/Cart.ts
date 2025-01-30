export interface CartProducts {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

export interface ICart {
    id: number;
    products: CartProducts[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface CartProductsResponse {
    carts: ICart[];
    total: number;
    skip: number;
    limit: number;
}

export interface Product {
    id: number;
    quantity: number;
}

export interface CartProductsRequest {
    id: number;
    products: Product[];
}