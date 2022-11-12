require("dotenv").config()
require("express-async-errors")
const express = require('express')
const errorHandlerMiddleware = require("./middlewares/error-handler")
const notFound = require("./middlewares/not-found")
const connectDB = require("./db/connect")
const authRouter = require("./routes/auth")
const booksRouter = require("./routes/books")
const app = express()

app.use(express.json())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/books", booksRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)

const port = process.env.PORT || 5000

const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`))
}
start()