document.addEventListener("DOMContentLoaded", function () {
    // Fade out the loading overlay when the window has fully loaded
    $(window).on('load', function () {
        $('#loading-overlay').fadeOut();
    });

    // Initialize the main slider with autoplay, dots, and arrows
    $('.slider').slick({
        autoplay: true,
        dots: true,
        arrows: true,
    });

    // Array of product objects
    const products = [
        {
            id: 1,
            name: 'Guitar',
            category: 'String Instruments',
            img: 'https://live.staticflickr.com/65535/53889787385_9610efaaf2_n.jpg',
            image: 'https://live.staticflickr.com/65535/53889787385_9610efaaf2_n.jpg',
            vendor: {
                name: 'Vendor 1',
                verified: true
            },
            short_description: 'Short description of the product.',
            price: '$500',
            quantity: 10,
            sound: '../audio/guitar.mp3'
        },
        {
            id: 2,
            name: 'Violin',
            category: 'String Instruments',
            img: 'https://live.staticflickr.com/65535/53888452407_8ded19c9b9_n.jpg',
            image: 'https://live.staticflickr.com/65535/53888452407_8ded19c9b9_n.jpg',
            vendor: {
                name: 'Vendor 2',
                verified: true
            },
            short_description: 'Short description of the product.',
            price: '$500',
            quantity: 10,
            sound: '../audio/violin.mp3'
        },
        {
            id: 3,
            name: 'Bagpipes',
            category: 'Wind Instruments',
            img: 'https://live.staticflickr.com/65535/53889599928_d4bdcfdca8_n.jpg',
            image: 'https://live.staticflickr.com/65535/53889599928_d4bdcfdca8_n.jpg',
            vendor: {
                name: 'Vendor 1',
                verified: true
            },
            short_description: 'Short description of the product.',
            price: '$600',
            quantity: 9,
            sound: '../audio/bagpipes.mp3'
        },
        {
            id: 4,
            name: 'Clarinet',
            category: 'Wind Instruments',
            img: 'https://live.staticflickr.com/65535/53889363716_545fa760b6_n.jpg',
            image: 'https://live.staticflickr.com/65535/53889363716_545fa760b6_n.jpg',
            vendor: {
                name: 'Vendor 4',
                verified: true
            },
            short_description: 'Short description of the product.',
            price: '$900',
            quantity: 17,
            sound: '../audio/clarinet.mp3'
        },
        {
            id: 5,
            name: 'Flute',
            category: 'Wind Instruments',
            img: 'https://live.staticflickr.com/65535/53888452402_4e69d78ac4_n.jpg',
            image: 'https://live.staticflickr.com/65535/53888452402_4e69d78ac4_n.jpg',
            vendor: {
                name: 'Vendor 2',
                verified: true
            },
            short_description: 'Short description of the product.',
            price: '$500',
            quantity: 15,
            sound: '../audio/flute.mp3'
        },
        {
            id: 6,
            name: 'Saxophone',
            category: 'Wind Instruments',
            img: 'https://live.staticflickr.com/65535/53889599888_46f02cc28c_n.jpg',
            image: 'https://live.staticflickr.com/65535/53889599888_46f02cc28c_n.jpg',
            vendor: {
                name: 'Vendor 7',
                verified: true
            },
            short_description: 'Short description of the product.',
            price: '$1100',
            quantity: 11,
            sound: '../audio/saxophone.mp3'
        },
    ];

    // Generate product slider elements and append them to the product slider container
    const productSlider = document.querySelector('.product-slider');
    if (productSlider) {
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("home-product");
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <button onclick="viewProduct(${product.id})" class="button product-button">View Details</button>
            `;
            productSlider.appendChild(productDiv);
        });

        // Initialize the product slider with responsive settings
        $('.product-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            dots: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1024, // Tablet landscape
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 768, // Tablet portrait
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480, // Mobile
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
    }

    // Function to view product details and store the selected product in local storage
    window.viewProduct = function (id) {
        const product = products.find(p => p.id === id);
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "html/product-details.html";
    };

    // Display the cart count if it is greater than 0, otherwise hide the cart count element
    const cartCount = localStorage.getItem('cartCount');
    if (cartCount && cartCount > 0) {
        $('#cart-count').text(cartCount).show();
    } else {
        $('#cart-count').hide();
    }

    // Register form validation and submission handling
    if (document.getElementById("registerForm")) {
        document.getElementById("registerForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            if (name && email && password) {
                localStorage.setItem("user", JSON.stringify({ name, email, password }));
                document.getElementById("message").innerText = "Registration successful!";
                window.location.href = "login.html";
            } else {
                document.getElementById("message").innerText = "Please fill out all fields.";
            }
        });
    }

    // Login form validation and submission handling
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
                // Show error message using SweetAlert
                swal('Error', "Invalid email or password.", 'error');
            }
        });
    }

    // Check for logged-in user and update the login button, welcome message, and cart icon
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
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
                // Remove items from local storage
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("selectedProduct");
                localStorage.removeItem("selectedProductQuantity");
                localStorage.removeItem("cartProducts");
                localStorage.removeItem("cartCount");

                // Get the current pathname
                var pathname = window.location.pathname;

                // Check if the current page is the index page
                if (pathname.endsWith("/index.html") || pathname === "/index.html") {
                    window.location.href = "index.html"; // Redirect to the index page
                } else {
                    window.location.href = "../index.html"; // Redirect to the parent directory's index page
                }
                document.getElementById("logoutButton").style.display = 'none';
            });
        }
    }

    // Function to show or hide the navigation menu
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId);

        // Validate that variables exist
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                // Add the show-menu class to the div tag with the nav__menu class
                nav.classList.toggle('show-menu');
            });
        }
    };

    // Show the navigation menu when the toggle button is clicked
    showMenu('nav-toggle', 'nav-menu');
});
