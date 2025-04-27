// Bas-klass Dish: representerar en generell maträtt
class Dish {
  constructor(name, price, description) {
    // Initierar egenskaper för namn, pris och beskrivning
    this.name = name;
    this.price = price;
    this.description = description;
  }
  // Metod för att visa maträttens info
  display() {
    return `${this.name} - ${this.price} kr: ${this.description}`;
  }
}

// Subklass Precourse (förrätt)
class Precourse extends Dish {
  constructor(name, price, description, spiceLevel) {
    super(name, price, description); // Anropar basklassens konstruktor
    this.spiceLevel = spiceLevel; // Lägger till en extra egenskap: kryddnivå
  }
  // Överskuggad metod som också visar kryddnivån
  display() {
    return `${super.display()} (Spice Level: ${this.spiceLevel})`;
  }
}

// Subklass Dessert (efterrätt)
class Dessert extends Dish {
  constructor(name, price, description, sweetnessLevel) {
    super(name, price, description); // Anropar basklassens konstruktor
    this.sweetnessLevel = sweetnessLevel; // Lägger till en extra egenskap: sötmanivå
  }
  // Överskuggad metod som också visar sötmanivån
  display() {
    return `${super.display()} (Sweetness: ${this.sweetnessLevel})`;
  }
}

// Subklass Maincourse (huvudrätt)
class Maincourse extends Dish {
  constructor(name, price, description, vegetarian) {
    super(name, price, description); // Anropar basklassens konstruktor
    this.vegetarian = vegetarian; // Lägger till en extra egenskap: vegetarisk eller ej
  }
  // Överskuggad metod som visar om rätten är vegetarisk
  display() {
    return `${super.display()} (Vegetarian: ${this.vegetarian ? "Yes" : "No"})`;
  }
}

// Array för att spara alla rätter
let dishes = [];
let users = [];

// Funktion för att hämta alla rätter från servern
async function fetchDishes() {
  const response = await fetch("http://localhost:3000/dishes");
  dishes = await response.json(); // Sparar hämtade rätter i arrayen
  displayDishes(); // Visar rätterna på sidan
}

// Funktion för att hämta alla användare från servern
async function fetchUsers() {
  const response = await fetch("http://localhost:3000/users");
  users = await response.json(); // Sparar hämtade rätter i arrayen
}

// Funktion för att lägga till en ny rätt
async function addDish(event) {
  event.preventDefault(); // Hindrar sidan från att laddas om

  // Hämtar värden från formuläret
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const extra = document.getElementById("extra").value;

  let dish;
  // Skapar rätt typ av rätt beroende på vald kategori
  if (category === "precourse") {
    dish = new Precourse(name, price, description, extra);
  } else if (category === "maincourse") {
    dish = new Maincourse(name, price, description, extra === "true");
  } else {
    dish = new Dessert(name, price, description, extra);
  }

  dish.id = Date.now().toString; // Ger varje rätt ett unikt ID baserat på tid
  console.log("Lägger till rätt:", dish); // Skriver ut i konsolen för felsökning

  // Skickar en POST-förfrågan till servern för att spara rätten
  const response = await fetch("http://localhost:3000/dishes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dish),
  });

  // Kollar om POST-förfrågan misslyckades
  if (!response.ok) {
    console.error("Fel vid POST-förfrågan:", await response.text());
    return;
  }

  fetchDishes(); // Uppdaterar listan med rätter
}

// Funktion för att ta bort en rätt
async function removeDish(id) {
  await fetch(`http://localhost:3000/dishes/${id}`, { method: "DELETE" });
  fetchDishes(); // Uppdaterar listan efter borttagning
}

// Funktion för att visa alla rätter på sidan
function displayDishes() {
  const dishList = document.getElementById("dishList");
  dishList.innerHTML = ""; // Rensar listan först

  // Loopa igenom alla rätter och skapa HTML-element
  dishes.forEach((dish) => {
    const li = document.createElement("li");
    li.textContent = `${dish.name} - ${dish.price}kr: ${dish.description}`;

    // Skapar en knapp för att ta bort rätten
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Ta bort";
    removeButton.onclick = () => removeDish(dish.id);

    li.appendChild(removeButton); // Lägg till knappen i listan
    dishList.appendChild(li); // Lägg till listan i DOM
  });
}

// Lägg till eventlyssnare på formuläret för att lägga till rätter
document.getElementById("dishForm").addEventListener("submit", addDish);
document.getElementById("logOut").addEventListener("click", logOut);

// Hämta rätter när sidan laddas
fetchDishes();

// Funktion för att hantera inloggning
function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  login(username, password);

  // Om inloggningen lyckas, visa rätt formulär
  if (checkLogin()) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("dishForm").style.display = "block";
    showRemoveButtons(true);
  }
}

// Funktion för att logga in, sparar status i localStorage
function login(username, password) {
  fetchUsers();
  users.forEach((user) => {
    if (user.username === username && user.password === password) {
      localStorage.setItem("loggedIn", "true");
      alert("Inloggad!");
    } else {
      alert("Fel användarnamn eller lösenord");
    }
  });
}

function logOut() {
  localStorage.setItem("loggedIn", "false");
  alert("utloggad!");
  location.reload();
}

// Funktion för att kontrollera om användaren är inloggad
function checkLogin() {
  return localStorage.getItem("loggedIn") === "true";
}

// Funktion som visar eller döljer alla remove-knappar
function showRemoveButtons(show) {
  const removeButtons = document.getElementsByClassName("remove-btn");
  for (let btn of removeButtons) {
    btn.style.display = show ? "inline-block" : "none";
  }
}
// När sidan laddas, visa antingen login-formuläret eller dish-formuläret
window.onload = function () {
  if (checkLogin()) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("dishForm").style.display = "block";
    showRemoveButtons(true);
  } else {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("dishForm").style.display = "none";
    showRemoveButtons(false);
  }
};
