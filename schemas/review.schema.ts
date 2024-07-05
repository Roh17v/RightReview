import { Schema, model } from "mongoose"

const reviewSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    }
})

export const Review = model("review", reviewSchema)