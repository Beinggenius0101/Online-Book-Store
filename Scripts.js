let books = JSON.parse(localStorage.getItem('books')) || [];

window.onload = function() {
  displayBooks(books);
  updateCartCount();
};

function displayBooks(bookArray) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = '';  // Clear previous content
  if (bookArray.length === 0) {
    bookList.innerHTML = '<p>No books available.</p>';
    return;
  }
  bookArray.forEach(book => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Price: $${book.price}</p>
      <button onclick="addToCart('${book.title}')">Add to Cart</button>
    `;
    bookList.appendChild(bookItem);
  });
}

function searchBooks() {
  const query = document.getElementById("search").value.toLowerCase();
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(query) || 
    book.author.toLowerCase().includes(query)
  );
  displayBooks(filteredBooks);
}

function addToCart(bookTitle) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(bookTitle);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${bookTitle} has been added to your cart!`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cart.length;
}

function showCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
  } else {
    alert("Your cart contains: " + cart.join(", "));
  }
}

function uploadBook(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const price = parseFloat(document.getElementById('price').value).toFixed(2);

  const newBook = { title, author, price };
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));

  alert('Book uploaded successfully!');
  window.location.href = 'index.html';
}