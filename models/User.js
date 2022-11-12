const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: 4,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

UserSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = async function () {
    return await jwt.sign({userID: this._id, userName: this.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.checkPassword = async function (enteredPassword) {
    isMatch = await bcrypt.compare(enteredPassword,this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)