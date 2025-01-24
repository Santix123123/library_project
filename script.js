const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = this.read === "yes" ? "no" : "yes";
};

// Function to Add Book to Library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  sortLibraryByAuthor();
  renderLibrary();
}

// Function to Sort Library by Author
function sortLibraryByAuthor() {
  myLibrary.sort((a, b) => a.author.localeCompare(b.author));
}

// Function to Render Library
function renderLibrary() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    bookDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read}</p>
      <button class="toggle-read-btn" data-index="${index}">Toggle Read</button>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    libraryDiv.appendChild(bookDiv);
  });

  addEventListeners();
}

// Event Listeners for Buttons
function addEventListeners() {
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      myLibrary.splice(index, 1);
      renderLibrary();
    });
  });

  document.querySelectorAll(".toggle-read-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      myLibrary[index].toggleReadStatus();
      renderLibrary();
    });
  });
}

// Form Handling
const newBookBtn = document.getElementById("new-book-btn");
const bookFormDialog = document.getElementById("book-form-dialog");
const bookForm = document.getElementById("book-form");
const cancelBtn = document.getElementById("cancel-btn");

newBookBtn.addEventListener("click", () => bookFormDialog.showModal());
cancelBtn.addEventListener("click", () => bookFormDialog.close());

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  bookFormDialog.close();
});
