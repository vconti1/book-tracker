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

router.get("/", (request, response) => {
  response.render("library");
});

module.exports = router;