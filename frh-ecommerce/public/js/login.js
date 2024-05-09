const apiURL = "http://localhost:3000/api"
let users = []

const loginFORM = document.querySelector("#login-form");


loginFORM.addEventListener('submit', handleLogin);

// Add event listener to load the users
document.addEventListener('DOMContentLoaded', async () => {   

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
        console.error("Failed to load users:", error);
    }
});

async function handleLogin(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    for (const [key, value] of Object.entries(user)) {
        if (value == "") {
            alert(`Please fill in all fields.`);
            return;
        }
    }

    // Find user by username
    const userExists = users.find(c => c.username === user.username);
    if (!userExists) {
        alert(`The username does not exist.`);
        return;
    } else {
        if (userExists.password === user.password) {
            await updateLoggedInUser(userExists.username)
            alert(`Login successful.`);
            window.location.href = "/public/html/main.html";
        } else {
            alert(`Incorrect Password. Try Again.`);
            return;
        }
    }
}

async function updateLoggedInUser(username){
    const customersResponse = await fetch(`${apiURL}/customers`);
    const customers = await customersResponse.json();
    const loggedInCustomer = customers.find(u => u.username === username);

    const artistsResponse = await fetch(`${apiURL}/artists`);
    const artists = await artistsResponse.json();
    const loggedInArtist = artists.find(u => u.username === username);

    let userEndpoint;
    let user;

    // Determine if the logged-in user is a customer or an artist
    if (loggedInCustomer) {
        userEndpoint = `${apiURL}/customers/${loggedInCustomer.id}`;
        user = loggedInCustomer;
    } else if (loggedInArtist) {
        userEndpoint = `${apiURL}/artists/${loggedInArtist.id}`;
        user = loggedInArtist;
    } 
    if (user) {
        user.isLoggedIn = true; // Modify the user object
        await fetch(userEndpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    }
}



function formToObject(form){
    const formData = new FormData(form)
    const data = {}

    for(const [key, value] of formData){
        data[key] = value
    }

    return data;
}