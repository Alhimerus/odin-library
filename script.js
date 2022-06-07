let myLibrary = [];
const bookcase = document.getElementById("bookcase");
const newBookButton = document.getElementsByClassName("new-book")[0];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
  }
}

function addBookToLibrary() {
  let title = prompt("What's the title of the book?", "TITLE");
  let author = prompt("Who's the author of the book?", "AUTHOR");
  let pages = prompt("How many pages does the book have?", 0);
  let read = prompt("Have you read the book?", false);
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  while(bookcase.firstChild) {
    bookcase.removeChild(bookcase.firstChild);
  }

  myLibrary.forEach(book => {
    let card = document.createElement("div");
    card.classList.add("card");
    let title = document.createElement("div");
    title.classList.add("title");
    title.textContent = book.title;
    card.appendChild(title);
    let author = document.createElement("div");
    author.classList.add("author");
    author.textContent = "by " + book.author;
    card.appendChild(author);
    let pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = book.pages + " pages";
    card.appendChild(pages);
    let read = document.createElement("div");
    read.classList.add("read");
    read.textContent = (book.read) ? "Has been read" : "Hasn't been read";
    card.appendChild(read);
    bookcase.appendChild(card);
  });
}

function addNewBook() {
  
}

newBookButton.addEventListener("click", addNewBook);

myLibrary[0] = new Book("Book1", "Author1", 15, true);
myLibrary[1] = new Book("Book2", "Author2", 20, false);
myLibrary[2] = new Book("Book3", "Author3", 25, true);
myLibrary[3] = new Book("Book4", "Author4", 30, false);

displayBooks();