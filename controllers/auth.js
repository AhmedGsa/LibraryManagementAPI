const User = require("../models/User")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, UnauthenticatedError} = require("../errors/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req,res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError("Please provide email and password! ")
    }
    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError("There is no user with such email, please try again !")
    }
    //compare password
    const checkPass = await user.checkPassword(password)
    if(!checkPass) {
        throw new UnauthenticatedError("Wrong Password!")
    }

    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({user:{name: user.name}, token})
}

const register = async (req,res) => {
    const {name, email, password} = req.body
    const user = await User.create({name, email, password})
    const token = await user.createJWT()
    res.status(StatusCodes.CREATED).send({name: user.name, token})
}


module.exports = {login,register}