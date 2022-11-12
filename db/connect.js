const mongoose = require('mongoose')

const connectDB = async (url) => {
    await mongoose.connect(url)
}

module.exports = connectDB