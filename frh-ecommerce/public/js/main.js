
const apiURL = "http://localhost:3000/api"

const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const categoriesDIV = document.querySelector("#categoriesDivs")

const categoryLINK = document.querySelector("#categories")
const loginLINK = document.querySelector("#login")
const categoryDD = document.querySelector("#dropdown-content")
const profileB = document.querySelector('#profile');

const searchText = document.querySelector('#searchBar');

categoryLINK.addEventListener("click", showCategoriesDROPDOWN)
profileB.addEventListener('click', profileCheck)



let categories =[]
let users =[]


// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Loading categories from prisma DB
        await loadCategories()

        //loading users from prisma DB
        await loadUsers()
        
        showCategories(categories)
        updateLoginLink()

    } catch (error) {
        console.error("Failed to load categories", error)
    }
})

// =======================================================Loading Functions================================================

// Function to load categories
async function loadCategories() {
    try{
        const response = await fetch(`${apiURL}/categories`)
        if (!response.ok) {
            throw new Error("Failed to fetch: " + response.statusText);
        }
        categories = await response.json()
    }catch(error){
        console.error("Error fetching categories:", error);
    }
    showCategories(categories)
}

async function loadUsers() {
    try {
        const customersURL = `${apiURL}/customers`;
        const artistsURL = `${apiURL}/artists`;

        // Execute both fetch requests in parallel
        const [customersResponse, artistsResponse] = await Promise.all([
            fetch(customersURL),
            fetch(artistsURL)
        ]);

        // Check if both responses are ok
        if (!customersResponse.ok) {
            throw new Error(`Failed to fetch customers: ${customersResponse.statusText}`);
        }
        if (!artistsResponse.ok) {
            throw new Error(`Failed to fetch artists: ${artistsResponse.statusText}`);
        }

        // Parse JSON responses
        const customers = await customersResponse.json();
        const artists = await artistsResponse.json();

        // Combine customers and artists into one array
        users = [...customers, ...artists];
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}


// ============================================================================================================================


function showCategories(categories){
    const mappedCategories = categories.map(
        category => 
        `
        <div onclick="navigateToFilteredItems(${category.id})">
            <img src="${category.image}" alt="${category.name}">
            <p>${category.name}</p>
        </div>
        `
    ).join('\n')
    
    categoriesDIV.innerHTML = mappedCategories
}

function navigateToFilteredItems(categoryId){
    window.location.href = `/public/html/all_Items.html?id=${categoryId}`
}

async function updateLoginLink() {
    try {
        // Fetch the users
        // users = JSON.parse(localStorage.getItem('users'));

        const loggedInUser = users.findIndex(u => u.isLoggedIn === true)

        if(loggedInUser!=-1){
            loginLINK.innerHTML = `<a href="#" id="loggedIn" class="login">Logout</a>`
            
            document.querySelector("#loggedIn").addEventListener('click', (e) => {
                e.preventDefault()
                handleLogout(loggedInUser)
            })
        }
        else{
            loginLINK.innerHTML = `<a href="#" id="loggedOut" class="login">Login</a>`
            
            document.querySelector("#loggedOut").addEventListener('click', (e) => {
                e.preventDefault()
                handleLogin()
            })
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



function handleLogin() {
    window.location.href = "/public/html/login.html"
}

function showCategoriesDROPDOWN(){  
    const mappedCategories = categories.map(c => `
        <a onclick="navigateToFilteredItems(${c.id})">${c.name}</a>
    `).join('\n')
    categoryDD.innerHTML = mappedCategories
    categoryDD.classList.toggle('show-dropdown')
}

function navigateToFilteredItems(categoryId){
    window.location.href = `/public/html/all_Items.html?id=${categoryId}`
}

async function profileCheck() {

    // Fetch customers and artists
    const response1 = await fetch(`${apiURL}/customers`);
    const customers = await response1.json();
    
    const response2 = await fetch(`${apiURL}/artists`);
    const artists = await response2.json();

    console.log(customers, artists);

    // Find the logged-in user in both lists
    const loggedInCustomer = customers.find(u => u.isLoggedIn === true);
    console.log(loggedInCustomer);
    const loggedInArtist = artists.find(u => u.isLoggedIn === true);
    console.log(loggedInArtist);

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