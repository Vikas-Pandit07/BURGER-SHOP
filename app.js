let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let ingredientsContainer = document.querySelector(".ingredients-container");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
  moveIngredientsContainer("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
  moveIngredientsContainer("active");
});

function moveIngredientsContainer() {
  ingredientsContainer.style.right = body.classList.contains("active")
    ? "1250px"
    : "1150px";
}

body.addEventListener("click", (event) => {
  if (!event.target.closest(".shopping") && body.classList.contains("active")) {
    body.classList.remove("active");
    moveIngredientsContainer();
  }
});

let products = [
  {
    id: 1,
    name: "CHEES BURGER",
    image: "1.jpg",
    price: 140,
  },
  {
    id: 2,
    name: "CHIKEN BURGER",
    image: "2.jpg",
    price: 180,
  },
  {
    id: 3,
    name: "CLASSIC BURGER",
    image: "3.jpg",
    price: 120,
  },
  {
    id: 4,
    name: "HAMBURGER",
    image: "4.jpg",
    price: 140,
  },
  {
    id: 5,
    name: "NUTBURGER",
    image: "5.jpeg",
    price: 160,
  },
  {
    id: 6,
    name: "CAPPCCINO BURGER",
    image: "6.jpg",
    price: 130,
  },
  {
    id: 7,
    name: "Elk burger",
    image: "7.jpg",
    price: 130,
  },
  {
    id: 8,
    name: "Bean burger",
    image: "8.jpg",
    price: 130,
  },
  {
    id: 9,
    name: "Veggie burger",
    image: "9.jpg",
    price: 130,
  },
];
let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>
            <button onclick="removeFromCard(${key})">Remove To Card</button>`;
    list.appendChild(newDiv);
  });

  const ingredientButtonsContainer = document.querySelector(
    ".ingredient-buttons"
  );

  for (let i = 0; i < 6; i++) {
    let newIngredientButton = document.createElement("button");
    newIngredientButton.innerText = `Ingredient ${i + 1}`;
    newIngredientButton.onclick = () =>
      addIngredientToCard(`Ingredient ${i + 1}`, 10 * (i + 1)); // Adjust the price accordingly
    ingredientButtonsContainer.appendChild(newIngredientButton);
  }
}

initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}

function removeFromCard(key) {
  if (listCards[key] != null) {
    delete listCards[key];
    reloadCard();
  }
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

function addIngredientToCard(ingredientName, price) {
  const existingIngredientIndex = listCards.findIndex(
    (item) => item.name === ingredientName
  );

  if (existingIngredientIndex !== -1) {
    listCards[existingIngredientIndex].quantity++;
  } else {
    const ingredient = {
      name: ingredientName,
      price: price,
      quantity: 1,
    };
    listCards.push(ingredient);
  }

  reloadCard();
}

function toggleSignupForm() {
  var formContainer = document.querySelector(".signup-form-container");
  formContainer.style.display =
    formContainer.style.display === "none" ? "block" : "none";
}
