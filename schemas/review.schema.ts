import { Schema, SchemaTypes, model } from "mongoose"
import { REVIEWS, USERS } from "../constants"

const reviewSchema = new Schema({
    body: {
        type: String,
        required: true,
        text: true,
    },
    product: {
        type: String,
        required: true,
        text: true,
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

export const Review = model(REVIEWS, reviewSchema)