document.addEventListener("DOMContentLoaded", function () {
    $(window).on('load', function () {
        $('#loading-overlay').fadeOut();
    });
    // Initialize the main slider
    $('.slider').slick({
        autoplay: true,
        dots: true,
        arrows: true,
    });

    const products = [
        {
            id: 1,
            name: 'Handcrafted Guitar',
            category: 'String Instruments',
            img: 'img/guitar.jpg',
            image: '../img/guitar.jpg',
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
            name: 'Handcrafted Violin',
            category: 'String Instruments',
            img: 'img/violin.jpg',
            image: '../img/violin.jpg',
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
            img: 'img/bagpipes.png',
            image: '../img/bagpipes.png',
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
            img: 'img/clarinet.png',
            image: '../img/clarinet.png',
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
            img: 'img/flute.jpg',
            image: '../img/flute.jpg',
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
            img: 'img/saxophone.jpg',
            image: '../img/saxophone.jpg',
            vendor: {
                name: 'Vendor 7',
                verified: true
            },
            short_description: 'Short description of the product.',
            price: '$1100',
            quantity: 11,
            sound: '../audio/saxophone.mp3'
        },
    ]

    // Generate product slider
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

        // Initialize the product slider
        $('.product-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            dots: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1024, // tablet landscape
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 768, // tablet portrait
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480, // mobile
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
    }

    // View product details
    window.viewProduct = function (id) {
        const product = products.find(p => p.id === id);
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "html/product-details.html";
    };

    const cartCount = localStorage.getItem('cartCount');

    if (cartCount && cartCount > 0) {
        $('#cart-count').text(cartCount).show();
    } else {
        $('#cart-count').hide();
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
                // document.getElementById("message").innerText = "Invalid email or password.";
                swal('Error', "Invalid email or password.", 'error');
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
                localStorage.removeItem("cartCount");
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
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId)

        // Validate that variables exist
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                // We add the show-menu class to the div tag with the nav__menu class
                nav.classList.toggle('show-menu')
            })
        }
    }
    showMenu('nav-toggle', 'nav-menu')
});
