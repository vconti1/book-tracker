"use strict";
/*
  Routes for reading statistics.

  This file should retrieve saved book data from MongoDB and calculate stats such as:
  - Total books saved
  - Number of books marked To Read
  - Number of books marked Reading
  - Number of books marked Finished
  - Average rating, if ratings are used
*/

const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.render("stats");
});

module.exports = router;