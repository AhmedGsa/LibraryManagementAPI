const express = require('express')
const {getBooks, addBook, deleteBook, borrowBook} = require("../controllers/books")
const auth = require("../middlewares/authentication")
const checkAdmin = require("../middlewares/check-admin")

const router = express.Router()

router.route("/").get(getBooks).post(auth,checkAdmin,addBook)
router.route("/:bookID").patch(auth,borrowBook).delete(auth,checkAdmin,deleteBook)

module.exports = router