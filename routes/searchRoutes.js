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

router.get("/", (request, response) => {
  response.render("search");
});

module.exports = router;