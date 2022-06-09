let myLibrary = [];
const bookcase = document.getElementById("bookcase");
const newBookButton = document.getElementsByClassName("new-book")[0];
const formContainer = document.getElementById("container");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");
const formRead = document.getElementById("read");
const formAdd = document.getElementById("add");
const formCancel = document.getElementById("cancel");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
  }
}

function displayBooks() {
  while (bookcase.firstChild) {
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
    read.textContent = (book.read === "yes") ? "Has been read" : "Hasn't been read";
    card.appendChild(read);
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener("click", () => {
      deleteBook(myLibrary.indexOf(book));
    });
    card.appendChild(deleteButton);
    bookcase.appendChild(card);
  });
}

function openNewBookForm() {
  formContainer.classList.remove("hidden");
  formContainer.classList.add("shown");
}

function addNewBook() {
  let title = formTitle.value;
  let author = formAuthor.value;
  let pages = Number(formPages.value);
  let read = formRead.value;
  if (!title || !author || !pages) {
    alert("Please fill out all fields");
  } else if (!formPages.validity.valid) {
    alert("The 'Number of pages:' should only contain numbers");
  } else if (formPages.value === 0) {
    alert("The 'Number of pages:' should be higher than 0");
  } else {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
    cancelNewBook();
  }
}

function cancelNewBook() {
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formRead.value = "no";
  formContainer.classList.remove("shown");
  formContainer.classList.add("hidden");
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

newBookButton.addEventListener("click", openNewBookForm);
formCancel.addEventListener("click", cancelNewBook);
formAdd.addEventListener("click", addNewBook);

myLibrary[0] = new Book("Book1", "Author1", 15, "yes");
myLibrary[1] = new Book("Book2", "Author2", 20, "no");
myLibrary[2] = new Book("Book3", "Author3", 25, "yes");
myLibrary[3] = new Book("Book4", "Author4", 30, "no");

displayBooks();