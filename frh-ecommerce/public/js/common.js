// Define variables for common DOM elements
let apiURL = "http://localhost:3000/api"
let loginLINK;
let profileB;

// Add a listener for the DOMContentLoaded event to initialize the page once it's fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Insert common elements like header and navigation into the page
    await insertCommonElements();
    // Add an event listener to the profile button for performing profile-related checks
    profileB.addEventListener('click', profileCheck);
});

// Function to insert common elements like headers and navigation bars
async function insertCommonElements() {
    // Load and insert the header
    await loadElement("header", "/public/html/common/header.html");
    // Load and insert the navigation bar
    await loadElement("nav", "/public/html/common/nav.html");

    // Initialize DOM element references after they have been loaded into the page
    profileB = document.querySelector('#profile');
    loginLINK = document.querySelector("#login");
    // Update the login link based on user's login status
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
        let users = await response.json()

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

// Function to handle user logout
async function handleLogout(loggedInUser) {
    if (loggedInUser == null) {
        alert(`The user does not exist.`);
        return;
    } else {
        // Set the user's loggedIn status to false and update prisma
        loggedInUser.isLoggedIn = false
        await fetch(`${apiURL}/customers/${loggedInUser.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': "application/json", },
                    body: JSON.stringify(loggedInUser)
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
    // Fetch customers and artists using the already declared apiURL
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

