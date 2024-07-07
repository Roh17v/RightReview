import { Schema, SchemaTypes, model } from "mongoose"
import { REVIEWS, USERS } from "../constants"

const reviewSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    author: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: USERS
    }
}, { timestamps: true })
reviewSchema.index({ body: 1, product: 1 })

export const Review = model(REVIEWS, reviewSchema)