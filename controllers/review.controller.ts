import { Router } from "express"
import { deleteReviewById, getReviewById, getReviews, postReview } from "../services/review.service"
import { AsyncLocalStorage } from "async_hooks"

const router = Router()

router.post("/", async function(req, res) {
    const { body, product } = req.body
    const review = await postReview(body, product, "John Doe")
    res.json(review)
})

router.get("/", async function(req, res) {
    const reviews = await getReviews()
    res.json({ reviews })
})

router.get("/:id", async function(req, res) {
    const id = req.params.id
    const review = await getReviewById(id)
    // console.log("Get By ID", review)
    res.json(review)
})

router.delete("/:id", async function(req, res) {
    const id = req.params.id
    const review = await deleteReviewById(id)
    res.json(review)
})

export default router