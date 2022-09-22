const { response } = require('express')
const express = require('express')
const router = express.Router()
const { Book, validateBook } = require('../models/books')

//post: create a new book
router.post('/', async (req, res) => {
  const error = await validateBook(req.body)

  if(error.message) res.status(400).send(error.message)

  book = new Book({
    name: req.body.bookName,
    author: {
      name: req.body.authorName,
      age: req.body.authorAge
    },
    genre: req.body.genre
  })

  book.save().then(book => {
    res.send(book)
  }).catch(error => {
    res.status(500).send("Book was not stored in db")
  })

})

//get all books
router.get('/', (req, res) => {
  Book.find()
    .then((books) => res.send(books))
    .catch(error => {
      res.status(500).send("Something went wrong")
    })
})

//get the book by id
router.get('/:bookId', async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  if(!book) res.status(404).send("Book not found")
  res.send(book)
})

//update book based on id
router.put('/:bookId', async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.bookId, 
    {
      name: req.body.bookName,
      author: {
        name: req.body.authorName,
        age: req.body.authorAge
      },
      genre: req.body.genre
    },
    { new:true }
  )

  if(!updatedBook) res.status(404).send("Book not found")
  res.send(updatedBook)
})

//delete book based on id
router.delete('/:bookId', async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.bookId)
  if(!book) res.status(404).send("Book not found")
  res.send(book)
})

module.exports = router