document.addEventListener("DOMContentLoaded", function () {

    let bookAppEl = document.getElementById("booksApp");

    let bookController = new BookController(bookAppEl);
    bookController.initApp();

})