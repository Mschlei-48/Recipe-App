import { useState} from 'react'
import {useNavigate } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './home.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './Layout.jsx';
import RecipePage from './recipePage.jsx'
import './home.css'
import './Recipe.css'
import Register from './register.jsx'
import Login from './login.jsx'

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
        <Route index element={<Login/>}/>
          <Route path="recipe" element={<RecipePage recipe={recipe}/>}/>
          <Route path="home" element={<Home handleRecipe={handleRecipe}/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
