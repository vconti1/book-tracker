"use strict";
/*
  Routes for the user's saved book library.

  This file should handle:
  - Saving selected books from Open Library into MongoDB
  - Displaying all saved books
  - Displaying details for one saved book
  - Showing the edit form for a saved book
  - Updating a book's status, notes, rating, or date finished
  - Deleting a saved book from MongoDB
*/

const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");

router.get("/", (req, res) => {
  res.render("library");
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find().sort({ dateAdded: -1 });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error loading books" });
  }
});

router.get("/:id", (req, res) => {
  res.render("bookDetails");
});

router.get("/:id/edit", (req, res) => {
  res.render("editBook");
});

router.get("/:id/data", async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (!book) {
      return response.status(404).json({ error: "Book not found" });
    }
    response.json(book);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error loading book" });
  }
});

router.post("/add", async (request, response) => {
  try {
    const { title, author, firstPublishYear, coverId, openLibraryKey, isbn } = request.body;

    if (openLibraryKey) {
      const existing = await Book.findOne({ openLibraryKey });
      if (existing) {
        return response.redirect("/library");
      }
    }

    await Book.create({ title, author, firstPublishYear, coverId, openLibraryKey, isbn });
    response.redirect("/library");
  } catch (error) {
    console.error(error);
    response.status(500).send("Error saving book");
  }
});

router.post("/:id/delete", async (request, response) => {
  try {
    await Book.findByIdAndDelete(request.params.id);
    response.redirect("/library");
  } catch (error) {
    console.error(error);
    response.status(500).send("Error deleting book");
  }
});

router.post("/:id/edit", async (request, response) => {
  try {
    const { status, rating, notes, dateFinished } = request.body;
    const updates = { status, notes };

    if (rating) {
      updates.rating = rating;
    }
    if (dateFinished) {
      updates.dateFinished = dateFinished;
    }

    await Book.findByIdAndUpdate(request.params.id, updates);
    response.redirect(`/library/${request.params.id}`);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error updating book");
  }
});
module.exports = router;
