import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './home.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './Layout.jsx';
import InputRecipe from './inputRecipe.jsx'
import RecipePage from './recipePage.jsx'
import './home.css'
import './Recipe.css'

function App() {
  const [recipe, setRecipe] = useState()
  const handleRecipe=((recipe)=>{
    setRecipe(recipe)
  })

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home handleRecipe={handleRecipe}/>}/>
          <Route path="input" element={<InputRecipe/>}/>
          <Route path="recipe" element={<RecipePage recipe={recipe}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
