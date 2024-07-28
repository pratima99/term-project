document.addEventListener("DOMContentLoaded", function () {
    // Initialize the main slider
    $('.slider').slick({
        autoplay: true,
        dots: true,
        arrows: true,
    });

    // Sample products data
    const products = [
        {id: 1, name: "Guitar", category: "String Instruments", price: 500, quantity: 10, image: "img/guitar.jpg"},
        {id: 2, name: "Violin", category: "String Instruments", price: 300, quantity: 5, image: "img/violin.jpg"},
        {id: 3, name: "Flute", category: "Wind Instruments", price: 150, quantity: 20, image: "img/flute.jpg"},
        {id: 4, name: "Harp", category: "String Instruments", price: 200, quantity: 8, image: "img/harp.png"},
        {id: 5, name: "Bagpipes", category: "Wind Instruments", price: 1000, quantity: 3, image: "img/bagpipes.png"},
        {id: 6, name: "Saxophone", category: "Wind Instruments", price: 600, quantity: 7, image: "img/saxophone.jpg"}
    ];

    // Generate product slider
    const productSlider = document.querySelector('.product-slider');
    if (productSlider) {
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("home-product");
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <button onclick="viewProduct(${product.id})">View Details</button>
            `;
            productSlider.appendChild(productDiv);
        });

        // Initialize the product slider
        $('.product-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            dots: true,
            arrows: true,
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });
    }

    // Display products on the page
    function displayProducts(products) {
        const productList = document.getElementById('productList');
        if (productList) {
            productList.innerHTML = '';
            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <button onclick="viewProduct(${product.id})">View Details</button>
                `;
                productList.appendChild(productDiv);
            });
        }
    }

    // View product details
    window.viewProduct = function (id) {
        const product = products.find(p => p.id === id);
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "html/product-details.html";
    };

    // Display product details
    if (document.getElementById("productDetails")) {
        const product = JSON.parse(localStorage.getItem("selectedProduct"));
        if (product) {
            const productDetails = document.getElementById("productDetails");
            productDetails.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Category: ${product.category}</p>
                <button id="addToCartButton">Add to Cart</button>
            `;
        }
    }

    // Add to cart functionality
    if (document.getElementById("addToCartButton")) {
        document.getElementById("addToCartButton").addEventListener("click", function () {
            const product = JSON.parse(localStorage.getItem("selectedProduct"));
            if (product) {
                product.quantity--;
                localStorage.setItem("selectedProduct", JSON.stringify(product));
                alert("Product added to cart!");
                window.location.href = "products.html";
            }
        });
    }

    // Register form validation
    if (document.getElementById("registerForm")) {
        document.getElementById("registerForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            if (name && email && password) {
                localStorage.setItem("user", JSON.stringify({name, email, password}));
                document.getElementById("message").innerText = "Registration successful!";
                window.location.href = "login.html";
            } else {
                document.getElementById("message").innerText = "Please fill out all fields.";
            }
        });
    }

    // Login form validation
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.email === email && user.password === password) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = "html/products.html";
            } else {
                document.getElementById("message").innerText = "Invalid email or password.";
            }
        });
    }

    // Check for logged-in user and update the login button
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const loginContainer = document.getElementById("loginContainer");
    const loginButton = document.getElementById("loginButton");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const cartIcon = document.getElementById("cart-icon");
    if (loginButton) {
        if (loggedInUser) {
            loginButton.style.display = "none";
            welcomeMessage.style.display = "inline";
            welcomeMessage.innerText = `Welcome, ${loggedInUser.name}!`;
            document.getElementById("logoutButton").style.display = "inline";
            cartIcon.style.display = "inline";
        } else {
            loginButton.style.display = "inline";
            welcomeMessage.style.display = "none";
            cartIcon.style.display = "none";
        }
    }
    // Logout functionality
    if (document.getElementById("logoutButton")) {
        if (document.getElementById("logoutButton").style.display !== 'none') {
            document.getElementById("logoutButton").addEventListener("click", function () {
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("selectedProduct");
                localStorage.removeItem("selectedProductQuantity");
                localStorage.removeItem("cartProducts");
                var pathname = window.location.pathname;
                if (pathname === "/term-project/index.html") {
                    window.location.href = pathname;
                } else {
                    window.location.href = "../index.html";
                }
                document.getElementById("logoutButton").style.display = 'none';
            });
        }
    }

});
