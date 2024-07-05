import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"

import reviewRouter from "./controllers/review.controller"

config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use("/review", reviewRouter)
app.use("/", (_, res) => {
    res.send("Hello, World!")
})


mongoose.connect(process.env.DB_URI!)
.then(function(){
    console.log("Connected to mongodb database")
    app.listen(PORT, ()=>console.log("Server started running on port:", PORT))
})
.catch(console.log)