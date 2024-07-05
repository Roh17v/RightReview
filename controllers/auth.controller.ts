import { Router } from "express"
import { compare, hash, genSaltSync } from "bcrypt"
import { createNewUser, getUserByEmail } from "../services/user.service"
import { sign } from "jsonwebtoken"
import { AUTH_KEY } from "../constants"
import { ReqWithUser } from "../types"

const router = Router()

router.get("/user", function(req: ReqWithUser, res) {
    res.json(req.user)
})

router.post("/signout", function(req, res) {
    res.clearCookie(AUTH_KEY)
    res.json({ message: "User signed out" })
})

router.post("/signup", async function(req, res) {
    const { email, username, password } = req.body
    const hashed = await hash(password, genSaltSync(+process.env.SALT!))
    console.log(hashed)
    const user = await createNewUser({
        email,
        username,
        password: hashed,
    })
    if (!user) {
        res.json({ error: "Failed to create user" })
    }
    return res.json({ message: "User signed up" })
})

router.post("/signin", async function(req, res) {
    const { email, password } = req.body
    const user = await getUserByEmail(email)
    if (!user) {
        res.status(404).json({ error: "User not found" })
        return
    }
    if (await compare(password, user.password)) {
        const token = sign({
            _id: user._id,
            email: user.email,
            username: user.username,  
        }, process.env.JWT_KEY!)
        res.cookie(AUTH_KEY, token)
        res.json({ message: "User signed in" })
    } else {
        res.status(401).json({ error: "Incorrect password" })
    }
})

export default router