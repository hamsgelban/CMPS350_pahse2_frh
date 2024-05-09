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
      window.location.href = "/public/html/historySeller.html";
  } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item: " + error.message);
  }
}

async function updateItem(itemId, updatedItem) {

  console.log(`Item id: ${itemId}`)
  console.log(`Item: ${updatedItem.available_quantity}`)
  
  try {
      const response = await fetch(`${apiURL}/items/${itemId}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(updatedItem)
      });

      console.log(response);
      if (!response.ok) {
          throw new Error("Failed to update item: " + response.statusText);
      }

      console.log("Item updated");
      // window.location.href = "/public/html/historySeller.html";
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