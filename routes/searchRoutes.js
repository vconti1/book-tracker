"use strict";
/*
  Routes for searching books using the Open Library API.

  This file should handle:
  - Showing the search form
  - Receiving the user's search input
  - Sending a request to the Open Library API
  - Passing the returned book data to the results EJS page
*/

const express = require("express");
const router = express.Router();

const { searchBooks } = require("../services/openLibraryService");

// GET /search
router.get("/", (req, res) => {
  res.render("search");
});

// GET /search/results?q=something
router.get("/results", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.render("results", {
        query: "",
        books: [],
      });
    }

    const books = await searchBooks(query);

    res.render("results", {
      query,
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching for books.");
  }
});

module.exports = router;