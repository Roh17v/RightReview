import { Schema, model } from "mongoose"
import { USERS } from "../constants"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

export const User = model(USERS, userSchema)