
function Book(title, author, pages, finished = false) {
    if (!new.target) {
        throw new Error("Illegal call");
    }
    this.ID = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finished = finished;
}
Book.prototype.equals = function(book) {
    if (!(book instanceof Book)) return false;
    return book.ID == this.ID;
}

let books = new Map();

function add_book_to_library(book) {
    if (!(book instanceof Book)) {
        throw new Error("illegal call");
    }
    books.set(book.ID, book);
}

function remove_book_from_library(book) {
    if (!(book instanceof Book)) {
        throw new Error("illegal call");
    }
    books.delete(book.ID);
}

Book.prototype.display = function() {
    const $html_section = document.createElement('div');
    $html_section.className = "card m-2 p-2";
    $html_section.innerHTML = `<h4>${this.title}</h4>
                              <p><strong>by:</strong> ${this.author}</p>
                              <p><strong>Pages:</strong> ${this.pages}</p>`;

    const $finished_button = document.createElement('button');

    $finished_button.className = this.finished ? "btn btn-success" : "btn btn-danger";
    $finished_button.textContent = this.finished ? "Finished" : "Not Finished";

    $html_section.appendChild($finished_button);

    $finished_button.addEventListener('click', () => {
        this.finished = !this.finished;
        $finished_button.className = this.finished ? "btn btn-success" : "btn btn-danger";
        $finished_button.textContent = this.finished ? "Finished" : "Not Finished";
    });

    const $delete_book = document.createElement('button');
    $delete_book.className = "btn";
    $delete_book.textContent = "Delete Book";
    $html_section.appendChild($delete_book);
    
    $delete_book.addEventListener('click', () => {
        remove_book_from_library(this);
        display_all();
    });

    return $html_section;    
}


function display_all() {
    const booksDiv = document.querySelector(".books");
    booksDiv.innerHTML = ''; // Limpia el contenido anterior
    books.forEach((book, key) => {
        booksDiv.appendChild(book.display());
    });
}

function empty_books() {
    books = new Map();
}
document.addEventListener("DOMContentLoaded", () => {
    add_book_to_library(new Book("Cien años de soledad", "Gabriel García Márquez", 417, true));
    add_book_to_library(new Book("1984", "George Orwell", 328, false));
    add_book_to_library(new Book("El Principito", "Antoine de Saint-Exupéry", 96, true));
    add_book_to_library(new Book("Don Quijote de la Mancha", "Miguel de Cervantes", 863, false));
    display_all();
});
