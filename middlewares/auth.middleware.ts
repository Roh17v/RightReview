import { NextFunction, Response } from "express"
import { AUTH_KEY } from "../constants"
import { verify } from "jsonwebtoken"
import { ReqWithUser, User } from "../types"

export function parseAuthCookie() {
    return (req: ReqWithUser, res: Response, next: NextFunction) => {
        const token = req.cookies[AUTH_KEY]
        if (token) {
            const user = verify(token, process.env.JWT_KEY!) as User | null
            if (user) {
                req.user = user
            }
        }
        next()
    }
}