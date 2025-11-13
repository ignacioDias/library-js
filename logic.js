const $add_book = document.getElementById("add-book");
const $pop_up = document.querySelector(".new-book");
const $clear = document.getElementById("clear");
const $close_pop_up = document.querySelector(".close");
const $save_book = document.getElementById("save-new-book");
const $form = document.getElementById("form-book")

const $pop_up_success = document.querySelector(".new-book-success");
const $close_success_pop_up = document.getElementById("close-new-book-success");

$close_pop_up.addEventListener('click', function() {  
    $pop_up.style.display = "none"
});

$add_book.addEventListener('click', function() {  
    $pop_up.style.display = "block"
});

window.onclick = (e) => {
    if(e.target == $pop_up) {
        $pop_up.style.display = "none"
    }
}

$form.onsubmit = function(e) {
    e.preventDefault(); // Evita que se recargue la página
    const $title = document.getElementById("title").value;
    const $author = document.getElementById("author").value;
    const $pages = document.getElementById("pages").value;
    let $finished = document.getElementById("finished").value;
    if($finished == "yes")
        $finished = true
    else
        $finished = false;
    $pop_up.style.display = "none";
    $pop_up_success.style.display = "block";
    $form.reset();

    let book = new Book($title, $author, $pages, $finished);
    add_book_to_library(book);
    display_all();
};

$close_success_pop_up.addEventListener('click', function() {  
    $pop_up_success.style.display = "none"
});


$clear.addEventListener('click', function() {
    empty_books();
    display_all(books);
});