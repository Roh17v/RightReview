import { User } from "../schemas/user.schema";
import { CreateUserDto } from "../types";

export function getUserById(id: string) {
    return User.findById(id)
}

export function getUserByEmail(email: string) {
    return User.findOne({ email })
}

export function createNewUser(data: CreateUserDto) {
    return User.create(data)
}