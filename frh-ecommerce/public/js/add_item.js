// const itemsURL = "/json/items.json"
const apiURL = "http://localhost:3000/api"

let items = []
let itemOnSale =[]
let itemId

const uploadForm = document.querySelector("#upload-form")
uploadForm.addEventListener("submit", handleSubmit)

// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
  try {
      // Load header
      const headerResponse = await fetch("/public/html/common/header.html")
      const headerHTML = await headerResponse.text()
      header.innerHTML = headerHTML
      
      //  Load nav
      const navResponse = await fetch("/public/html/common/nav.html")
      const navHTML = await navResponse.text()
      nav.innerHTML = navHTML

      loadItems()
      // items = JSON.parse(localStorage.getItem('items'))
      // itemOnSale = JSON.parse(localStorage.getItem('itemOnSale'));
      
      const urlParams = new URLSearchParams(window.location.search);
      itemId = parseInt(urlParams.get('id'));
      console.log(itemId);

      if(itemId){
        handleUpdate(itemId)
      }
  
  } catch (error) {
      console.error("Failed to load nav or header:", error)
  }
});

async function loadItems() {
  // items = JSON.parse(localStorage.getItem('items'))
  try {
    const response = await fetch(`${apiURL}/items`);
    if (!response.ok) {
        throw new Error("Failed to fetch: " + response.statusText);
    }
    items = await response.json();
    console.log("Items fetched:", items);  
  } catch (error) {
      console.error("Error fetching items:", error);
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const formElement = e.target;
  const itemDetails = formToObject(formElement);

  if (itemId != null) {
      // Handle update
      await updateItem(itemId, itemDetails);
      alert("Item updated!");
  } else {
      // Handle add
      await addItem(itemDetails);
      alert("Item added!");
  }
}

async function addItem(item) {
  try {
      const response = await fetch(`${apiURL}/items`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
      });

      if (!response.ok) {
          throw new Error("Failed to add item: " + response.statusText);
      }
      
      console.log("Item added");
      window.location.href = "/html/historySeller.html";
  } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item: " + error.message);
  }
}

async function updateItem(itemId, item) {
  try {
      const response = await fetch(`${apiURL}/items/${itemId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
      });

      if (!response.ok) {
          throw new Error("Failed to update item: " + response.statusText);
      }

      console.log("Item updated");
      window.location.href = "/html/historySeller.html";
  } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item: " + error.message);
  }
}


async function handleUpdate(itemId) {
  try {
      const response = await fetch(`${apiURL}/items/${itemId}`);
      if (!response.ok) {
          throw new Error("Failed to fetch item: " + response.statusText);
      }
      const item = await response.json();

      document.querySelector("#title").value = item.title;
      document.querySelector("#available_quantity").value = item.available_quantity;
      document.querySelector("#price").value = item.price;
      document.querySelector("#image_url").value = item.image_url;
      document.querySelector("#image_url").readOnly = true;
      document.querySelector("#description").value = item.description;
      
      // Set the category dropdown
      const categoryDropdown = document.querySelector(".dropdown-categories");
      categoryDropdown.value = mapIdToCategory(item.categoryId); // Assuming you have a reverse mapping function
  } catch (error) {
      console.error("Error fetching item details:", error);
      alert("Item not found: " + error.message);
  }
}

function mapIdToCategory(categoryId) {
  const idMapping = {
      1: "painting",
      2: "sculpture",
      3: "pottery",
      4: "drawing or illustration",
      5: "digital art"
  };
  return idMapping[categoryId] || "Choose a category";
}


function formToObject(form) {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
      if (key === "category") { // Assuming you need to map category names to IDs
          data["categoryId"] = mapCategoryToId(value);
      } else {
          data[key] = value;
      }
  });
  return data;
}

function mapCategoryToId(categoryName) {
  // Map category names to IDs; you would replace this with actual IDs from your database
  const categoryMapping = {
      "painting": 1,
      "sculpture": 2,
      "pottery": 3,
      "drawing or illustration": 4,
      "digital art": 5
  }
  return categoryMapping[categoryName] || null;
}



// function handleSubmit(e) {
//   e.preventDefault()
//   const item = formToObject(e.target);

//   for (const [k, value] of Object.entries(item)) {
//     if (value == "") {
//       alert("Please fill all fields")
//       return;
//     }
//   }

//   // const exist = items.findIndex(i => i.image_url === item.image_url)
//   let exist
//   if(itemId!=null){
//     exist = items.find(i => i.id === itemId)
//   }

//   if (exist != null) {
//     // Handle update
//     updateItem(itemId, exist)
//     alert("Item updated !")
//     return; // Prevent further execution after updating
//   } else {
//     setItemArtist(itemId, exist)
//     item.quantity_to_buy = 0
//     item.clients = []

//     items.push(item);
//     localStorage.setItem('items', JSON.stringify(items))
//     //What does this do??
//     localStorage.setItem('itemOnSale', JSON.stringify(itemOnSale))
//     console.log("Item added")
//     window.location.href = "/html/historySeller.html"
//   }
// }

// function handleUpdate(id, item){
//   // Find the item by its ID
//   // console.log(typeof id)
//   // console.log(items);
//   // const item = items.find(i => i.ID == id);
//   // console.log(item)
//   if(item){
//     // Populate the form fields with the item data
//     document.querySelector("#title").value = item.title;
//     document.querySelector("#available_quantity").value = item.available_quantity;
//     document.querySelector("#price").value = item.price;
//     document.querySelector("#image_url").value = item.image_url;
//     document.querySelector("#image_url").readOnly = true; // Make image URL read-only
//     document.querySelector("#description").value = item.description;
    
//     // Select the category in the dropdown
//     const categoryDropdown = document.querySelector(".dropdown-categories");
//     for (let option of categoryDropdown.options){
//       if (option.value === item.category) {
//         option.selected = true;
//         break;
//       }
//     }
//   }
//   else{
//     alert("Item not found.");
//   }
// }

// async function setItemArtist(item) {

//   // let users = JSON.parse(localStorage.getItem('users'));
//   // console.log(users)
//   const response = await fetch(`${apiURL}/artists`)
//   const users = await response.json()

//   let artist = users.filter(u => u.type == "seller")
//   let loggedInArtist = artist.find((u) => u.isLoggedIn == true)

//   // console.log(loggedInArtist)
//   // item.ID = Date.now()
//   item.currency = "QAR"
//   item.artist = loggedInArtist.name
//   item.artistID = loggedInArtist.id
  
//   // loggedInArtist.itemsOnSale.push(item.ID)
//   // localStorage.setItem('users', JSON.stringify(users))

// }


// function formToObject(form) {
//   const formData = new FormData(form);
//   const data = {};
//   for (const [e, value] of formData) {
//     data[e] = value;
//   }
//   console.log(data)
//   return data;
// }

// function updateItem(imageUrl) {

//   const itemIndex = items.findIndex(i => i.image_url === imageUrl);
  
//   if (itemIndex !== -1) {
//     const updatedItemDetails = formToObject(uploadForm);
    
//     // Update the item's details except for the image URL, which is read-only.
//     items[itemIndex].title = updatedItemDetails.title;
//     items[itemIndex].available_quantity = updatedItemDetails.available_quantity;
//     items[itemIndex].price = updatedItemDetails.price;
//     items[itemIndex].description = updatedItemDetails.description;
//     items[itemIndex].category = updatedItemDetails.category;
    
//     localStorage.setItem('items', JSON.stringify(items));
    
//     console.log("Item updated");
//     window.location.href = "/html/historySeller.html"; 
//   } else {
//     console.log("Item with provided image URL not found");
//     alert("Item not found");
//   }
// }









