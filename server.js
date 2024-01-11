//express: fast lightweight web framework for node.js, make it easier to make http inpoints that we can use for our web server
//cors (cross origin resource sharing) which allows a jx requests to skip the same origin policy and access resources from remote posts
//basically prevents errors when we try to access a database from a different host as our server
//cors package provides express middleware thn can be used to enable cors with different options

import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app


