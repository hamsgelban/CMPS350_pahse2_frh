const apiURL = "http://localhost:3000/api"
let users = [];

const loginFORM = document.querySelector("#login-form");


loginFORM.addEventListener('submit', handleLogin);

// Add event listener to load the users
document.addEventListener('DOMContentLoaded', async () => {   

    try {
        // localStorage.setItem('lastSearchTerm', null);
        const response = await fetch(`${apiURl}/customers/`)
        users = await response.json()
    
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
            userExists.isLoggedIn = true
            alert(`Login successful.`);
            await fetch(`${apiURL}/customers/${userExists.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': "application/json", },
                    body: JSON.stringify(userExists)
                });
            window.location.href = "/public/html/main.html";
        } else {
            alert(`Incorrect Password. Try Again.`);
            return;
        }
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