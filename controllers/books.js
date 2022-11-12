const { StatusCodes } = require("http-status-codes")
const { BadRequestError } = require("../errors")
const Book = require("../models/Book")

const getBooks = async (req,res) => {
    const books = await Book.find({})
    res.status(StatusCodes.OK).json(books)
}

const addBook = async (req,res) => {
    const {name, author, description} = req.body
    const book = await Book.create({name, author, description})
    res.status(StatusCodes.CREATED).json(book)
}

const deleteBook = async (req,res) => {
    const {bookID} = req.params
    const book = await Book.findById(bookID)
    if(!book) {
        throw new BadRequestError("Book doesn't exist !")
    }
    await Book.findByIdAndRemove(bookID)
    res.status(StatusCodes.OK).send("Successfuly deleted !")
}

const borrowBook = async (req,res) => {
    const {bookID} = req.params
    const book = await Book.findById(bookID)
    if(!book) {
        throw new BadRequestError("Book doesn't exist !")
    }
    console.log(book);
    if(book.borrowed) {
        throw new BadRequestError("Book already borrowed !")
    }
    const {userID} = req.user
    await Book.findByIdAndUpdate(bookID,{borrowed: true, borrowerID: userID})
    res.status(StatusCodes.OK).send("You borrowed the book, please make sure to return it!")
}

module.exports = {
    getBooks,
    addBook,
    deleteBook,
    borrowBook
}