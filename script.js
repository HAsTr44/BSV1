// script.js

function generateBooks(count) {
    const books = [];
    for (let i = 1; i <= count; i++) {
        books.push({
            id: i,
            title: `Project ${i}`,
            author: `HT`,
            price: (0).toFixed(2), // Incremental price
            image: `https://picsum.photos/150/200?random=${i}` // Random image
        });
    }
    return books;
}

// Generate 82 books dynamically
const books = generateBooks(82);

let cart = [];

function displayBooks(bookArray) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    bookArray.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Price: $${book.price}</p>
            <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;
        bookList.appendChild(bookCard);
    });
}

function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    cart.push(book);
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCartItems();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function toggleCart() {
    const cartSection = document.getElementById('cart');
    cartSection.classList.toggle('hidden');
    displayCartItems();
}

function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.title} - $${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

function checkout() {
    alert(`Thank you for your purchase! Total items: ${cart.length}`);
    cart = [];
    updateCartCount();
    displayCartItems();
}

document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
});

// Initial display of books
displayBooks(books);

function checkout() {
    const emailInput = document.getElementById('email').value;

    // Validate email
    if (!validateEmail(emailInput)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Display the checkout message
    alert(`Thank you for your purchase! \nTotal items: ${cart.length}\nConfirmation sent to: ${emailInput}`);
   
    
    // Clear the cart
    cart = [];
    updateCartCount();
    displayCartItems();
    document.getElementById('email').value = ''; // Clear email input
}

// Helper function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

