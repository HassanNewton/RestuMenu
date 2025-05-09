
# RestuMenu

RestuMenu är en enkel webbaserad restaurangapplikation där användare kan:
- Logga in
- Lägga till nya rätter (förrätter, huvudrätter, efterrätter)
- Visa rätter
- Ta bort rätter

Projektet använder **JavaScript**, **HTML** och en lokal server (exempelvis via `json-server`).

---

## Funktioner

- **Dish-basklass**: Representerar en generell maträtt med namn, pris och beskrivning.
- **Subklasser**:
  - `Precourse`: För förrätter (extra egenskap: kryddnivå).
  - `Maincourse`: För huvudrätter (extra egenskap: vegetarisk eller ej).
  - `Dessert`: För efterrätter (extra egenskap: sötmanivå).
- **Inloggning**: Användare måste logga in för att kunna lägga till eller ta bort rätter.
- **CRUD-operationer**: Hämta, skapa och ta bort rätter via API-anrop.

---

## Användning

1. **Starta backend-servern** (exempelvis med `json-server`):
   ```bash
   json-server --watch db.json --port 3000

`db.json`  bör innehålla exempeldata som:




{
  "dishes": [],
  "users": [
    {
      "username": "admin",
      "password": "password"
    }
  ]
}

2.  Navigera till din HTML-sida i webbläsaren.
    
3.  Logga in med användarnamn och lösenord.
    
4.  Lägg till rätter genom formuläret:
    
    -   Välj kategori (förrätt, huvudrätt, efterrätt)
        
    -   Fyll i nödvändiga fält
        
    -   Lägg till rätten
        
5.  Ta bort rätter genom att klicka på "Ta bort"-knappen.
    

----------

## Klassstruktur

### Dish (Basklass)

class Dish {
  constructor(name, price, description) { ... }
  display() { ... }
}

### Precourse (Subklass: Förrätt)

class Precourse extends Dish {
  constructor(name, price, description, spiceLevel) { ... }
  display() { ... }
}

### Maincourse (Subklass: Huvudrätt)

class Maincourse extends Dish {
  constructor(name, price, description, vegetarian) { ... }
  display() { ... }
}

### Dessert (Subklass: Efterrätt)

class Dessert extends Dish {
  constructor(name, price, description, sweetnessLevel) { ... }
  display() { ... }
}

----------

## API-anrop

### Hämta rätter:

fetch("http://localhost:3000/dishes")

### Hämta användare:

fetch("http://localhost:3000/users")

### Lägga till en rätt (POST):

fetch("http://localhost:3000/dishes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(dish),
});

### Ta bort en rätt (DELETE):

fetch(`http://localhost:3000/dishes/${id}`, { method: "DELETE" });

----------

## Inloggning och säkerhet

Inloggningsstatus sparas i  `localStorage`:

localStorage.setItem("loggedIn", "true");

Vid utloggning nollställs status och sidan laddas om:


localStorage.setItem("loggedIn", "false");
location.reload();

Felaktiga inloggningsuppgifter visar ett varningsmeddelande.

----------

## Att tänka på

-   Kom ihåg att starta en lokal server för att API-anrop ska fungera.
    
-   Kontrollera att portnummer (3000) stämmer.
    
-   ID:t  för varje rätt sätts till tidsstämpeln (`Date.now()`).
    
-   För att lägga till förrätter, huvudrätter eller efterrätter används olika subklasser.
    

----------

## Exempel på att lägga till en ny rätt

1.  Välj kategori: Förrätt.
    
2.  Fyll i: Namn, Pris, Beskrivning, Kryddnivå.
    
3.  Klicka på "Lägg till".
    

**Exempel på förrätt:**

-   Garlic Bread - 45 kr: Toasted bread with garlic butter. (Spice Level: Mild)
    
