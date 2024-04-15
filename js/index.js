function Book(title, author, pages, read) {
    this.id = generateUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages}, ${read}`; // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
    };
}

Book.prototype.toggleRead = function () {
    this.read === 'read' ? (this.read = 'not read yet') : (this.read = 'read');
};

const theHobbit = new Book(
    'The Hobbit',
    'J.R.R Tolkien',
    '295 pages',
    'not read yet'
);
const harryPotter = new Book(
    "Harry Potter and the Philosopher's Stone",
    'J.K. Rowling',
    '320 pages',
    'read'
);
const toKillAMockingbird = new Book(
    'To Kill a Mockingbird',
    'Harper Lee',
    '281 pages',
    'read'
);
const prideAndPrejudice = new Book(
    'Pride and Prejudice',
    'Jane Austen',
    '432 pages',
    'not read yet'
);
const theGreatGatsby = new Book(
    'The Great Gatsby',
    'F. Scott Fitzgerald',
    '180 pages',
    'read'
);
const lordOfTheRings = new Book(
    'The Lord of the Rings',
    'J.R.R. Tolkien',
    '1178 pages',
    'not read yet'
);

const myLibrary = [
    theHobbit,
    harryPotter,
    toKillAMockingbird,
    prideAndPrejudice,
    theGreatGatsby,
    lordOfTheRings,
];

const booksById = {};
myLibrary.forEach((book) => {
    booksById[book.id] = book;
});
console.log(booksById);

function generateUID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function addBookToLibrary(e) {
    e.preventDefault();
    const bookData = getBookData();
    const { title, author, pages, read } = bookData;
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    booksById[newBook.id] = newBook;
    console.table(myLibrary);
    createBookCard(newBook);
}

function createBookCard({ id, title, author, pages, read }) {
    const bookCards = document.querySelector('ul');
    const bookCard = document.createElement('li');
    bookCard.innerHTML = `
        <h3>${title}</h3>
        <p>${author}</p>
        <p>${pages}</p>
        <p data-read>${read}</p>
    `;

    const bookCardButtons = document.createElement('div');
    bookCardButtons.setAttribute('data-id', id);

    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.textContent = 'toggle read';
    toggleReadBtn.addEventListener('click', (e) => toggleRead(e));
    bookCardButtons.appendChild(toggleReadBtn);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'remove';
    removeBtn.addEventListener('click', (e) => removeBookCard(e));
    bookCardButtons.appendChild(removeBtn);
    bookCard.appendChild(bookCardButtons);

    bookCards.appendChild(bookCard);
}

function toggleRead(e) {
    const cardId = e.target.parentNode.dataset.id;
    const bookById = booksById[cardId];
    const book = myLibrary[myLibrary.indexOf(bookById)];
    book.toggleRead();
    const readInfo =
        e.target.parentNode.parentNode.querySelector('[data-read]');
    readInfo.textContent = book.read;
}

function removeBookCard(e) {
    const card = e.target.parentNode.parentNode;
    card.remove();
    const cardId = e.target.parentNode.dataset.id; // data-(id of book)
    const bookToRemove = booksById[cardId];
    myLibrary.splice(myLibrary.indexOf(bookToRemove), 1);
}

function getBookData() {
    const formData = new FormData(document.querySelector('form'));
    const readRadio = document.querySelector(
        'input[name="read"]:checked'
    ).value; // read || not read yet
    const bookData = {
        title: formData.get('title'),
        author: formData.get('author'),
        pages: formData.get('pages'),
        read: readRadio,
    };
    return bookData;
}

const submitBookBtn = document.querySelector('button');
submitBookBtn.addEventListener('click', (e) => addBookToLibrary(e));

function showLibrary() {
    console.table(myLibrary);
    myLibrary.map((book) => createBookCard(book));
}

showLibrary();
