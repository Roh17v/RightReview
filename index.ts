import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import cookieParser from  "cookie-parser"

import authRouter from "./controllers/auth.controller"
import reviewRouter from "./controllers/review.controller"
import { parseAuthCookie } from "./middlewares/auth.middleware"
import path from "path"

config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(parseAuthCookie())

app.use("/api/auth", authRouter)
app.use("/api/review", reviewRouter)

app.use("/assets", express.static(path.join(__dirname, "..", "client", "dist", "assets"), { redirect: false }))
app.use("*", express.static(path.join(__dirname, "..", "client", "dist")))

mongoose.connect(process.env.DB_URI!)
.then(function(){
    console.log("Connected to mongodb database")
    app.listen(PORT, ()=>console.log("Server started running on port:", PORT))
})
.catch(console.log)
