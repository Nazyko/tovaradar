export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface Reviews {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string
}

export interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

export interface ProductData {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: Array<string>;
    brand: string;
    sku: string
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Array<Reviews>
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
}

export interface GetProductsResponse {
    limit: number;
    products: ProductData[];
    total: number;
    skip: number;
}

export type SearchData = {
    id: number,
    title: string,
    category: string,
}

type Hair = {
    color: string;
    type: string;
}

type Address = {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}

type Coordinates = {
    lat: number;
    lng: number;
}

type Bank = {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

type Company = {
    department: string;
    name: string;
    title: string;
    address: Address
    country: string
}

type CryptoProps = {
    coin: string;
    wallet: string;
    network: string;
}

export interface UsersProps {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: CryptoProps;
    role: string;
}

export interface ICart {
    id: number;
    products: ProductData[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface CategoryListResponse {
    slug: string;
    name: string;
    url: string;
}

export interface GetProductsByCategoryResponse {
    total: number;
    limit: number;
    skip: number;
    products: ProductData[];
}

export interface SearchProductsResponse {
    products: ProductData[];
    total: number;
    limit: number;
    skip: number;
}

export interface IUser {
    id: number;
    username: string;
    accessToken: string;
    refreshToken: string;
}

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthMe {
    Authorization: string;
}

export interface Headers {
    headers: AuthMe
}