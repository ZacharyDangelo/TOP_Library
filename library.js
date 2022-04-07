const bookContainer = document.querySelector(".book-container");
const addBookForm = document.querySelector(".add-book-form")
let myLibrary = [];
document.querySelector("#add-book-button").addEventListener("click", showAddBook);
document.querySelector("#form-submit").addEventListener("click", submitAddBookForm);



function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function showAddBook(){
    addBookForm.classList.toggle("invisible");
}

function validateForm(){
    const titleInput = document.querySelector("#title-input");
    const authorInput = document.querySelector("#author-input");
    const pagesInput = document.querySelector("#pages-input");

    const titleAlert = document.querySelector("#title-alert");
    const authorAlert = document.querySelector("#author-alert");
    const pagesAlert = document.querySelector("#pages-alert");

    let valid = true;

    if(!titleInput.value){
        titleAlert.classList.remove("invisible");
        valid = false;
    }
    else{
        titleAlert.classList.add("invisible");
    }
    if(!authorInput.value){
        authorAlert.classList.remove("invisible");
        valid = false;
    }
    else{
        authorAlert.classList.add("invisible");
    }
    if(!pagesInput.value){
        pagesAlert.classList.remove("invisible");
        valid = false;
    }
    else{
        pagesAlert.classList.add("invisible");
    }

    return valid;
}

function resetForm(){
    const titleInput = document.querySelector("#title-input");
    const authorInput = document.querySelector("#author-input");
    const pagesInput = document.querySelector("#pages-input");
    const readInput = document.querySelector("#read-input");

    const titleAlert = document.querySelector("#title-alert");
    const authorAlert = document.querySelector("#author-alert");
    const pagesAlert = document.querySelector("#pages-alert");

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.value = false;
    
    titleAlert.classList.add("invisible");
    authorAlert.classList.add("invisible");
    pagesAlert.classList.add("invisible");
    
    addBookForm.classList.add("invisible");
}

function submitAddBookForm(evt){
    evt.preventDefault();
    console.log("Submitting book form");
    if(validateForm()){
        const titleInput = document.querySelector("#title-input");
        const authorInput = document.querySelector("#author-input");
        const pagesInput = document.querySelector("#pages-input");
        const readInput = document.querySelector("#read-input");
        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        addBookToLibrary(newBook);
        resetForm();

    }
    else{
        console.log("Form is invalid.");
    }
}




function addBookToLibrary(book){
    myLibrary.push(book);
    displayBooks(myLibrary);
}

function displayBooks(library){
    library.forEach(book => {
        let bookIsDisplayed = false;
        Array.from(bookContainer.children).forEach( elem => {
            if (elem.dataset.id == myLibrary.indexOf(book)) bookIsDisplayed = true;
        })
        if (bookIsDisplayed) return;
        const card = document.createElement("div");
        card.dataset.id = myLibrary.indexOf(book);
        card.classList.add("book-card");
        const title = document.createElement("h3");
        title.textContent = book.title;
        card.appendChild(title);
        const author = document.createElement("h4");
        author.textContent = book.author;
        card.appendChild(author);
        const pages = document.createElement("p");
        pages.textContent = book.pages + " pages";
        card.appendChild(pages);
        book.isRead ? card.classList.add("read") : card.classList.add("not-read");
        book.isRead ? card.classList.remove("not-read") : card.classList.remove("read");
        bookContainer.appendChild(card);
        addButtons(card);
    });
    updateStats();
}

function addButtons(elem){
    const container = document.createElement("div");
    container.classList.add("button-container");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", removeBook)
    deleteButton.id_param = elem.dataset.id;
    deleteButton.card_param = elem;
    container.appendChild(deleteButton);

    const readButton = document.createElement("button");
    readButton.textContent = "Read?";
    readButton.addEventListener("click", toggleReadStatus);
    readButton.id_param = elem.dataset.id;
    readButton.card_param = elem;
    container.appendChild(readButton);

    elem.appendChild(container);
}

function setBookIds(idRemoved){
    console.log(idRemoved);
    let currId = 0;
    Array.from(bookContainer.children).forEach( elem => {
        elem.dataset.id = currId;
        currId++;
    })
}

function removeBook(evt){
    console.log(evt.currentTarget.id_param);
    myLibrary.splice(evt.currentTarget.id_param,1);
    bookContainer.removeChild(evt.currentTarget.card_param);
    setBookIds(evt.currentTarget.id_param);
    updateStats();
}

function toggleReadStatus(evt){
    const id = evt.currentTarget.id_param;
    const book = myLibrary[id];
    const card = evt.currentTarget.card_param;
    book.isRead = !book.isRead;
    if(book.isRead){
        card.classList.remove("not-read");
        card.classList.add("read");
    }
    if(!book.isRead){
        card.classList.remove("read");
        card.classList.add("not-read");
    }
    updateStats();


}

function updateStats(){
    const totalBooksElem = document.getElementById("total-books");
    const totalReadElem = document.getElementById("total-read");
    const totalUnreadElem = document.getElementById("total-unread");
    const pagesReadElem = document.getElementById("pages-read");
    const pagesUnreadElem = document.getElementById("pages-unread");

    let totalBooks = 0;
    let totalRead = 0;
    let totalUnread = 0;
    let pagesRead = 0;
    let pagesUnread = 0;

    myLibrary.forEach(book => {
        totalBooks++;
        book.isRead ? totalRead++ : totalUnread++;
        book.isRead ? pagesRead += +book.pages : pagesUnread += +book.pages;
    });
    totalBooksElem.textContent = totalBooks;
    totalReadElem.textContent = totalRead;
    totalUnreadElem.textContent = totalUnread;
    pagesReadElem.textContent = pagesRead;
    pagesUnreadElem.textContent = pagesUnread;
}

/*
const book1 = new Book("Game of thrones", "Georgy Martino", 100000, false);
addBookToLibrary(book1);
const book2 = new Book("Dresden Files", "Jim Butcher", 510, true);
addBookToLibrary(book2);
const book3 = new Book("The Bible", "Jod", 1400, false);
addBookToLibrary(book3);

displayBooks(myLibrary);
const book4 = new Book("Oreilly Perl Programming", "Jim oreilly", 999, true);
addBookToLibrary(book4);
displayBooks(myLibrary);
*/