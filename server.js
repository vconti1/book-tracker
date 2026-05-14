"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");;

require("dotenv").config({
  path: path.resolve(__dirname, "credentialsDontPost/.env"),
});

const connectToDatabase = require("./db/mongooseConnection");

const searchRoutes = require("./routes/searchRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

app.use(express.static('public'));

// if (process.argv.length !== 3) {
//   console.log("Usage: node server.js port_number");
//   process.exit(1);
// }

// const portNumber = process.argv[2];

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (request, response) => {
  response.render("index");
});

app.use("/search", searchRoutes);
app.use("/library", libraryRoutes);
app.use("/stats", statsRoutes);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});