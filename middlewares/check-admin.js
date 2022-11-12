const { ForbiddenError } = require("../errors")
const User = require("../models/User")


const checkAdmin = async (req,res,next) => {
    try {
        const {userID} = req.user
        const user = await User.findOne({_id: userID})
        if(!user.isAdmin) {
            throw new ForbiddenError("Access Denied")
        }
        next()
    } catch (error) {
        console.log(error);
        throw new ForbiddenError("Access Denied")
    }
}

module.exports = checkAdmin