// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import MainLayout from "./layout/MainLayout.jsx"
// import logoButterflyText from "./assets/YoYo_butterfly_200x52.jpg"
// import logoButterflyOnly from "./assets/YoYo_butterfly_only_200x199.jpg"

import './App.css'
import ColorCheck from "./dev/ColorCheck"

function App() {


  return (
    <>
      <div>
      {/* header component */}
      {/* header component som innehåller
                hero section component
                navigation-bar component som även den kan delas upp i fler komponenter så att
                                        vissa kan återanvändas i footer 
                                        länk components
                                        favikon till favikon och som home-länk här
                                        menu component with the symbol
                                        cart component with the symbol
      */}
      <header>
          <p>header component (hero-section and navbar)</p>
      </header>

      {/* main component will be children */}
      <main>
        <hr />
        <p>color check start</p>
        <ColorCheck />
        <p>color check end</p>
        <hr />
      </main>
      

      {/* footer component  ska innehålla text och kanske också länkar t.ex. till about */}
      <footer><p>footer component</p></footer>

      </div>
    </>
  )
}

export default App
