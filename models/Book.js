const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide book name"]
    },
    author: {
        type: String,
        required: [true, "Please provide author name"]
    },
    description: {
        type: String
    },
    borrowed: {
        type: Boolean,
        default: false
    },
    borrowerID: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Book",BookSchema)