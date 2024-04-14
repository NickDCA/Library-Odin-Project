function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages}, ${read}`; // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
    };
}

function addBookToLibrary(book) {
    const formData = new FormData(document.querySelector('form'));
    const readRadio = document.querySelector(
        'input[name="read"]:checked'
    ).value;
    const newBook = new Book(
        formData.get('title'),
        formData.get('author'),
        formData.get('pages'),
        readRadio
    );
    myLibrary.push(newBook);
}

const myLibrary = [];

const theHobbit = new Book(
    'The Hobbit',
    'J.R.R Tolkien',
    '295 pages',
    'not read yet'
);

const submitBookBtn = document.querySelector('button');
submitBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
    console.table(myLibrary);
});
