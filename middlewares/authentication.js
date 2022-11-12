const jwt = require("jsonwebtoken")
const {UnauthenticatedError} = require("../errors/index")

const auth = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthenticatedError("Authentication Invalid")
    }
    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userID: payload.userID, userName: payload.userName}
        next()
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid")
    }
}

module.exports = auth