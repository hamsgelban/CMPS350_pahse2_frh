// Define variables for common DOM elements
let apiURL = "http://localhost:3000/api"
let loginLINK;
let profileB;

document.addEventListener('DOMContentLoaded', async function() {
    await insertCommonElements();
    bindEventListeners();
});

function bindEventListeners() {
    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'profile') {
            profileCheck();
        }
        if (e.target && e.target.id === 'loggedIn') {
            e.preventDefault();
            handleLogout();
        }
        if (e.target && e.target.id === 'loggedOut') {
            e.preventDefault();
            handleLogin();
        }
    });
}

async function insertCommonElements() {
    await loadElement("header", "/public/html/common/header.html");
    await loadElement("nav", "/public/html/common/nav.html");
    updateLoginLink();
}

// Function to load HTML content into a specified element by its ID
async function loadElement(elementId, url) {
    const element = document.getElementById(elementId);
    if (element) {
        const response = await fetch(url);
        element.innerHTML = await response.text();
    }
}

// Function to update the login link based on the user's login status
async function updateLoginLink() {
    try {

        const response = await fetch(`${apiURL}/customers`)
        let customers = await response.json()

        const response2 = await fetch(`${apiURL}/artists`)
        let artists = await response2.json()

        let users = []
        users.concat(customers)
        users.concat(artists)

        // Find the index of the logged-in user
        const loggedInUser = users.find(u => u.isLoggedIn == true);

        if(loggedInUser != null) {
            // If a user is logged in, change the link to a logout option
            loginLINK.innerHTML = `<a href="#" id="loggedIn" class="login">Logout</a>`;
            
            // Add a logout event listener
            document.querySelector("#loggedIn").addEventListener('click', (e) => {
                e.preventDefault();
                handleLogout(loggedInUser);
            });
        }
        else {
            // If no user is logged in, provide a login link
            loginLINK.innerHTML = `<a href="#" id="loggedOut" class="login">Login</a>`;
            
            // Add a login event listener
            document.querySelector("#loggedOut").addEventListener('click', (e) => {
                e.preventDefault();
                handleLogin();
            });
        }
    
    } catch (error) {
        console.error("Failed to update login link:", error);
    }
}

async function handleLogout() {
    // Fetch both customer and artist data to find the logged-in user
    const customersResponse = await fetch(`${apiURL}/customers`);
    const customers = await customersResponse.json();
    const loggedInCustomer = customers.find(u => u.isLoggedIn === true);

    const artistsResponse = await fetch(`${apiURL}/artists`);
    const artists = await artistsResponse.json();
    const loggedInArtist = artists.find(u => u.isLoggedIn === true);

    let userEndpoint;
    let user;

    // Determine if the logged-in user is a customer or an artist
    if (loggedInCustomer) {
        userEndpoint = `${apiURL}/customers/${loggedInCustomer.id}`;
        user = loggedInCustomer;
    } else if (loggedInArtist) {
        userEndpoint = `${apiURL}/artists/${loggedInArtist.id}`;
        user = loggedInArtist;
    } else {
        alert("No logged in user found.");
        return;
    }

    // Set the user's loggedIn status to false and update via the correct endpoint
    if (user) {
        user.isLoggedIn = false; // Modify the user object
        await fetch(userEndpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        alert("You have been successfully logged out.");
        // Refresh the login link to reflect the logout
        updateLoginLink();
    }
}


// Function to redirect the user to the login page
function handleLogin() {
    window.location.href = "/public/html/login.html";
}

async function profileCheck() {

    // Fetch customers and artists
    const response1 = await fetch(`${apiURL}/customers`);
    const customers = await response1.json();
    
    const response2 = await fetch(`${apiURL}/artists`);
    const artists = await response2.json();

    // Find the logged-in user in both lists
    const loggedInCustomer = customers.find(u => u.isLoggedIn === true);
    const loggedInArtist = artists.find(u => u.isLoggedIn === true);

    // Redirect based on the type of logged-in user
    if (loggedInCustomer) {
        window.location.href = "/public/html/history.html"; // Redirect for customers
    } else if (loggedInArtist) {
        window.location.href = "/public/html/historySeller.html"; // Redirect for artists
    } else {
        // If no user is logged in, prompt login and redirect to the login page
        alert("Login before proceeding.");
        window.location.href ="/public/html/login.html";
    }
}

