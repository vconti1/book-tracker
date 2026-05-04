"use strict";
/*
  Open Library API service.

  This file is responsible for:
  - Searching books using the Open Library API
  - Cleaning raw API results into a simpler format
  - Returning book objects that the rest of the app can use
*/


async function searchBooks(searchTerm) {
  const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`;

  const apiResponse = await fetch(apiUrl);

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch books from Open Library.");
  }

  const data = await apiResponse.json();

  const books = data.docs.slice(0, 10).map((book) => {
    return {
      title: book.title || "Unknown Title",
      author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
      firstPublishYear: book.first_publish_year || "",
      coverId: book.cover_i || "",
      openLibraryKey: book.key || "",
      isbn: book.isbn ? book.isbn[0] : "",
    };
  });

  return books;
}

module.exports = {
  searchBooks,
};