import { Router } from "express";
import {
  deleteReviewById,
  getReviewById,
  getReviews,
  createReview,
} from "../services/review.service";
import { ReqWithUser } from "../types";
import { isValidObjectId } from "mongoose";

const router = Router();

router.post("/", async function (req: ReqWithUser, res) {
  if (!req.user) {
    return res.status(401).json({ error: "User not signed in" });
  }
  const { body, product, rating } = req.body;
  const review = await createReview({
    body,
    product,
    rating: Math.min(Math.max(Number(rating) || 0, 0), 5),
    author: req.user._id,
  });
  res.json(review);
});

router.get("/", async function (req: ReqWithUser, res) {
  const query = (req.query.query as string) || "";
  const sort = req.query.sort === "date" ? "date" : "rate";
  const page = Math.max(Number(req.query.page) || 1, 1);

  try {
    const reviews = await getReviews({ query, sort, page });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    res.json({ error: "Invalid review id" });
    return;
  }
  const review = await getReviewById(id);
  res.json(review);
});

router.delete("/:id", async function (req: ReqWithUser, res) {
  if (!req.user) {
    return res.status(401).json({ error: "User not signed in" });
  }
  const id = req.params.id;
  const review = await getReviewById(id);
  if (!review) {
    return res.status(400).json({ error: "Invalid review id" });
  }
  if (review.author.equals(req.user._id)) {
    const _review = await deleteReviewById(id);
    res.json(_review);
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
});

export default router;
