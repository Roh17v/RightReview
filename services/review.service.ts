import { MAX_ITEMS } from "../constants"
import { Review } from "../schemas/review.schema"
import { CreateReviewDto, GetReviewFilter } from "../types"

export async function createReview(data: CreateReviewDto) {
    const review = new Review(data)
    return await review.save()
}

export async function getReviews(filter: GetReviewFilter) {
    const sort = filter.sort === "date" ? "createdAt" : "rating"
    const page = (filter.page - 1) * MAX_ITEMS
    const reviews = await Review.find()
    .sort(`-${sort}`)
    .skip(page)
    .limit(MAX_ITEMS)
    .populate("author", { email: false, password: false })
    return reviews
}

export async function getReviewById(id: string) {
    const review = await Review.findById(id)
    return review
}

export async function deleteReviewById(id: string) {
    const review = await Review.deleteOne({ _id: id })
    return review
}