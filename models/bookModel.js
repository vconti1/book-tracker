"use strict";

const mongoose = require("mongoose");

/*
  Book model for saved books in the user's library.

  This schema defines the structure of each book document stored in MongoDB.
  Some fields come from the Open Library API, while others are created by
  the app/user.
*/

const bookSchema = new mongoose.Schema({
  // Data from Open Library API
  title: {
    type: String,
    required: true,
    trim: true,
  },

  author: {
    type: String,
    default: "Unknown Author",
    trim: true,
  },

  firstPublishYear: {
    type: Number,
  },

  coverId: {
    type: String,
    default: "",
  },
  // Open Library’s own ID/path for a book or work in their system
  openLibraryKey: {
    type: String,
    default: "",
  },
  // International Standard Book Number
  isbn: {
    type: String,
    default: "",
  },

  // Data created/managed by this app
  status: {
    type: String,
    enum: ["To Read", "Reading", "Finished"],
    default: "To Read",
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  notes: {
    type: String,
    default: "",
    trim: true,
  },

  dateAdded: {
    type: Date,
    default: Date.now,
  },

  dateFinished: {
    type: Date,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;