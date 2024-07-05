import { Request } from "express"

export interface CreateUserDto {
    email: string,
    username: string,
    password: string,
}

export interface CreateReviewDto {
    product: string,
    body: string,
    rating: number,
    author: string,
}

type SortOptions = "date" | "rate"

export interface GetReviewFilter {
    query: string,
    page: number,
    sort: SortOptions,
}

export interface User {
    _id: string,
    email: string,
    username: string,
}

export type ReqWithUser = Request & { user?: User }