## Välkommen till mitt projektarbete Bygga en Webshop med React 2026!
Projektarbete i kurserna:
* Frontend Ramverk/Bibliotek (React, Angular)
* JavaScript Avancerat
### Innehållsförteckning
- Projektbeskrivning
- Installera och starta projektet
- Beskrivning av implementationen
  
### <a id="proj"></a>Projektbeskrivning
En React-applikation skapas från grunden med externa API-anrop och grundläggande funktionalitet för e-handel.

Målet med projektet är att skapa en enkel men funktionell webshop där användare kan:
* Lista produkter hämtade från DummyJSON API (https://dummyjson.com/)
* Visa en produktsida med detaljerad information, där användare kan lägga till produkter i sin kundvagn och justera kvantiteten
* Se en orderöversikt, lägga till personliga uppgifter och slutföra sin order.

### Funktionskrav
#### Produktlista
Applikationen ska hämta och visa en lista över produkter från DummyJSON API.
Varje produkt i listan ska visa minst produktens namn, pris, och en bild.
Användaren ska kunna klicka på en produkt för att gå till produktsidan.
#### Produktsida
Produktsidan ska visa detaljerad information om produkten, inklusive namn, pris, beskrivning, och bild.
Användaren ska kunna välja kvantitet och lägga till produkten i sin kundvagn.
#### Kundvagn och Orderöversikt
Användaren ska kunna se en översikt över valda produkter i kundvagnen, inklusive totalt pris.
Från kundvagnen ska användaren kunna gå till en orderöversikt(kassa) där personliga uppgifter (t.ex. namn och adress) kan läggas till.
Användaren ska kunna "lägga till sin order" vilket kan simulera en beställningsprocess genom att bara visa en bekräftelse (ingen riktig POST-request krävs).

### Tekniska krav
* Projektet ska utvecklas med React (create vite@latest)
* Använd funktionella komponenter och Hooks för tillståndshantering och sidoeffekter. (useState och useEffect)
* Styling kan göras med CSS, SASS, eller något CSS-in-JS bibliotek efter eget val.
* Använd fetch (eller axios) för att göra API-anrop till DummyJSON. Informationen om apiet finns här https://dummyjson.com/docs/products.
* Använd React Router för navigering mellan olika sidor/vyer (t.ex. Hem, Produktsida, Kundvagn, Kassa)
* Felhantering i useEffect: När API-anrop görs i useEffect MÅSTE try...catch användas för att fånga upp och hantera eventuella nätverksfel på ett korrekt sätt.
* Prestanadoptimering: Implementera debounce-funktion i projektet. Detta kan till exempel tillämpas på en sökfunktion för produkter eller om man klickar snabbt för att ändra kvantitet i varukorgen.

### Utvärderingskriterier
Projektet kommer att bedömas utifrån följande kriterier:
* Funktionalitet: Alla kravspecifikationer är uppfyllda (produkter, varukorg, kassa, sök/debounce mm).
* Kodkvalitet: Kod är välorganiserad, kommenterad, följer god praxis och inkluderar stabil felhantering (try/catch).
* Användarupplevelse (UX): Applikationen är lättanvänd, logisk att navigera i och visuellt tilltalande.
* Innovation: Kreativa lösningar och tillägg som förbättrar den grundläggande funktionaliteten belönas.

### Inlämning
*Ditt färdiga projekt ska laddas upp till ett offentligt Git-repositorium (GitHub). Länken lämnas in i Learnpoint.
* Inkludera en välskriven README-fil i git-repo. Den ska innehålla tydliga instruktioner för att installera och starta projektet (ex npm install), samt att redovisa koden till examinatorn.
* Beskrivning i korthet i README av implementationen av debounce-funktionen och felhanteringen med try...catch.

### Projektredovising
Projektredovisning Demo av webbplats och kod 2026-06-09

### Installera och starta projektet


### Beskrivning av implementationen


### SLUT

