"use strict";
/*
  Open Library API service.

  This file is responsible for:
  - Searching books using the Open Library API
  - Cleaning raw API results into a simpler format
  - Returning book objects that the rest of the app can use
*/


async function searchBooks(searchTerm) {
  const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&fields=title,author_name,first_publish_year,cover_i,key,isbn`;

  const apiResponse = await fetch(apiUrl);

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch books from Open Library.");
  }

  const data = await apiResponse.json();
    // console.log(data.docs.slice(0, 3).map(book => ({
    //   title: book.title,
    //   isbn: book.isbn
    // })));

  const books = data.docs.slice(0, 10).map((book) => {
    const isbn =
    book.isbn && book.isbn.length > 0
      ? book.isbn.find(num => num.length === 13) || book.isbn[0]
      : "No ISBN available";
    return {
      title: book.title || "Unknown Title",
      author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
      firstPublishYear: book.first_publish_year || "",
      coverId: book.cover_i || "",
      openLibraryKey: book.key || "",
      isbn: isbn,
    };
  });

  return books;
}

module.exports = {
  searchBooks,
};