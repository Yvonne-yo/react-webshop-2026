## Välkommen till mitt projektarbete Bygga en Webshop med React 2026!
Projektarbete i kurserna:
* Frontend Ramverk/Bibliotek (React, Angular)
* JavaScript Avancerat
## Innehållsförteckning
- Projektbeskrivning
- Installera och starta projektet
- Om implementationen
  - Projektimplementation
  - React Projektstruktur: react-webshop-2026
  - Global State Management (GSM)
  - Debounce och try...catch
  
## <a id="proj"></a>Projektbeskrivning
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
* Ditt färdiga projekt ska laddas upp till ett offentligt Git-repositorium (GitHub). Länken lämnas in i Learnpoint.
* Inkludera en välskriven README-fil i git-repo. Den ska innehålla tydliga instruktioner för att installera och starta projektet (ex npm install), samt att redovisa koden till examinatorn.
* Beskrivning i korthet i README av implementationen av debounce-funktionen och felhanteringen med try...catch.

### Projektredovising
Projektredovisning Demo av webbplats och kod 2026-06-09

## Installera och starta projektet
1) Github repo:<br>
git clone https://github.com/Yvonne-yo/react-webshop-2026.git

2) Öppna VScode
* Öppna folder react-webshop-2026
3) Öppna terminalen (Git Bash)
* Installera genom att köra kommando:<br>
npm install
* Starta genom att köra kommando:<br>
npm run dev
4) Öppna webläsaren och öppna länken:<br>
http://localhost:5173/

Nu hälsas du välkommen till YoYo webshop!

## Om implementationen
### Projektimplementation:<br>
Byggverktyg: Vite<br>
Språk: Javascript<br>
Bibliotek: React<br>
CSS: Hybrid med index.css & Tailwindcss v4<br>
Font: @fontsource-variable/open-sans<br>
Ikoner: lucide-react<br>
SPA routing: react-router-dom<br>

### React Projektstruktur: react-webshop-2026
README.md<br>
index.html<br>

./src:<br>
App.jsx<br>
main.jsx<br>
index.css<br>

./src/api:<br>
productsApi.js<br>

./src/assets:<br>
YoYo_butterfly_only_200x199.jpg<br>

./src/components:<br>
BoutiqueError.jsx<br>
BoutiqueLoader.jsx<br>
BrandTagLine.jsx<br>
CartProvider.jsx<br>
HeroSection.jsx<br>
PopularProducts.jsx<br>
ProductCard.jsx<br>
ProductDetailCard.jsx<br>
QuantityController.jsx<br>
ReturnToHomeLink.jsx<br>
ThemeProvider.jsx<br>

./src/config:<br>
shopConfig.js<br>

./src/context:<br>
CartContext.js<br>
ThemeContext.js<br>

./src/hooks:<br>
useCart.js<br>
useDebounce.js<br>
useFeaturedProducts.js<br>
useProducts.js<br>
useSearch.js<br>
useTheme.js<br>

./src/layout:<br>
Footer.jsx<br>
MainContent.jsx<br>
MainLayout.jsx<br>
NavBar.jsx<br>

./src/views:<br>
AboutView.jsx<br>
CartView.jsx<br>
CategoryView.jsx<br>
CheckoutView.jsx<br>
ContactView.jsx<br>
HomeView.jsx<br>
ProductDetailView.jsx<br>
SearchView.jsx<br>

### Global State Management (GSM)
Shopping cart:<br>
./src/context/CartContext.js<br>
./src/components/CartProvider.jsx<br>
./src/hooks/useCart.js<br>

Light/Dark mode:<br>
./src/context/ThemeContext.js<br>
./src/components/ThemeProvider.jsx<br>
./src/hooks/useTheme.js<br>

### Debounce och try...catch
#### Debounce
* .src/hooks/useDebounce.js

#### DummyJSON API
* ./src/api/productsApi.js<br> 
Alla anrop till DummyJSON API hanteras i denna fil och använder async/await och try...catch.

#### Try...Catch
* .src/hooks/useFeaturedProducts.js<br>
import { getProductsByCategory } from "../api/productsApi";

Här finns en useEffect som använder async/await och  try...catch...finally för att hämta de 4 utvalda produkterna som visas på förstasidan i YoYo webshop.
Memory leak protection finns.

* .src/hooks/useProducts.js<br>
import { getAllProducts, getProductsByCategory } from "../api/productsApi";

Här finns en useEffect som använder async/await och try...catch...finally för att hämta alla produkter inom en viss kategori för att visa i YoYo webshop när kunden väljer en viss kategori från menyn.
Memory leak protection finns.

#### Try...Catch och Debounce
* .src/hooks/useSearch.js<br>
import { searchProducts } from "../api/productsApi";<br>
import { useDebounce } from "./useDebounce";<br>

Här finns en useEffect som använder async/await och try...catch...finally för att hämta sökresultatet från dummyJSON. En kontroll görs för att säkerställa att endast produkter inom giltiga katergorier visas som sökresultat.

Debounce används för sökfältet. Här sätter jag debounce delay till 4 sekunder så det blir tydligt vid demo.
Memory leak protection finns.

### SLUT

