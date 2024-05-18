const express = require("express");
const router = express.Router();
const Book = require("../models/books");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, async (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
  });
  try {
    const newBook = await book.save();

    return res.status(201).json({
      message: `Buku yang baru dibuat dengan ID ${book._id}`,
      newBook,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();

    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const books = await Book.findById(req.params.id);

    return res
      .status(200)
      .json({ message: `Buku dengan ID ${books._id}`, books });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const updateBook = await Book.updateOne(
      { _id: req.params.id },
      {
        title: req.body.title,
        author: req.body.author,
      }
    );

    return res.status(200).json({
      message: `Buku dengan ID ${req.params.id} telah di perbaharui`,
      updateBook,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const deleteBook = await Book.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      message: `Buku dengan ID ${req.params.id} telah di hapus`,
      deleteBook,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
