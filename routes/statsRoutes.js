// "use strict";
// /*
//   Routes for reading statistics.

//   This file should retrieve saved book data from MongoDB and calculate stats such as:
//   - Total books saved
//   - Number of books marked To Read
//   - Number of books marked Reading
//   - Number of books marked Finished
//   - Average rating, if ratings are used
// */

// const express = require("express");
// const router = express.Router();

// router.get("/", (request, response) => {
//   response.render("stats");
// });

// module.exports = router;

"use strict";

const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");

router.get("/", async (request, response) => {
  try {
    const [statusCounts, ratingData, books] = await Promise.all([
      Book.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]),
      Book.aggregate([
        { $match: { rating: { $exists: true, $ne: null } } },
        { $group: { _id: null, avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
      ]),
      Book.find().sort({ dateAdded: -1 })
    ]);

    const stats = {
      total: books.length,
      toRead: 0,
      reading: 0,
      finished: 0,
      avgRating: null,
      ratedCount: 0,
    };

    for (const entry of statusCounts) {
      if (entry._id === "To Read")   stats.toRead   = entry.count;
      if (entry._id === "Reading")   stats.reading  = entry.count;
      if (entry._id === "Finished")  stats.finished = entry.count;
    }

    if (ratingData.length > 0) {
      stats.avgRating  = ratingData[0].avgRating.toFixed(1);
      stats.ratedCount = ratingData[0].count;
    }
    console.log("stats object:", stats);
    response.render("stats", { stats });
  } catch (error) {
    console.error(error);
    response.status(500).send("Error loading stats");
  }
});

module.exports = router;