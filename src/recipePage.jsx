import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Recipe.css'

// When someone clicks on a recipe in the homepage they should be
// directed here where they can see the recipe they chose
function RecipePage(props){
    const recipe=props.recipe;
    const [content,setContent]=useState("ingred")
    const navigate=useNavigate()

    const handleContent=((content)=>{
        if(content==="ingred"){
            return  <p className="content">{recipe.ingredients}</p>
        }
        else if(content==="direct"){
            return <p className="content">{recipe.directions}</p>
        }
    })
    return(
        <div>
            <button onClick={()=>navigate("/home")} id="back-button"><span id="back-arrow">← </span>Back</button>
        <p className="title">{recipe.title}</p>
        <img src={recipe.img} className="image"/>
        <br></br>
        <br></br>
        <div className="main-contents">
            <button className="recipe-buttons" onClick={()=>setContent("ingred")}>Ingredients</button>
            <button id="dir" className="recipe-buttons" onClick={()=>setContent("direct")}>Directions</button>
        </div>
        {handleContent(content)}
        </div>
    )
}

export default RecipePage;