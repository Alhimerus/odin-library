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
    let changeReadingStatusButton = document.createElement("button");
    changeReadingStatusButton.classList.add("change-reading-status");
    changeReadingStatusButton.textContent = "READ/UNREAD";
    changeReadingStatusButton.addEventListener("click", () => {
      changeReadingStatus(myLibrary.indexOf(book));
    });
    card.appendChild(changeReadingStatusButton);
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
  let pages = formPages.value;
  let read = formRead.value;
  if (!title || !author || !pages) {
    alert("Please fill out all fields");
  } else if (!formPages.validity.valid) {
    alert("The 'Number of pages:' should only contain numbers");
  } else if (Number(formPages.value) === 0) {
    alert("The 'Number of pages:' should be higher than 0");
  } else {
    let book = new Book(title, author, Number(pages), read);
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

function changeReadingStatus(index) {
  myLibrary[index].read = (myLibrary[index].read==="yes") ? "no" : "yes";
  displayBooks();
}

newBookButton.addEventListener("click", openNewBookForm);
formCancel.addEventListener("click", cancelNewBook);
formAdd.addEventListener("click", addNewBook);