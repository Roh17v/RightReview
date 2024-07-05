import { Review } from "../schemas/review.schema"

export async function postReview(body: string, product: string, authro: string) {
    const review = new Review({
        body,
        product,
    })
    return await review.save()
}

export async function getReviews() {
    const reviews = await Review.find()
    return reviews
}

export async function getReviewById(id: string) {
    const review = await Review.findById(id)
    return review
}

export async function deleteReviewById(id: string) {
    // TODO: check if author is current user
    const review = await Review.deleteOne({ _id: id })
    return review
}