import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './input.css'


// When someone clicks on the Add Recipe button
// they shpuld be directed here where they can enter their recipe and sbmit it
// They must then be redirected to the home page after submitting the recipe
// THey shuld also receive an alert telling them they have successfully added the recipe
function InputRecipe(){

    const [title,setTitle]=useState("")
    const [direct,setDirect]=useState("")
    const [ingred,setIngred]=useState("")
    const [img,setImg]=useState("")
    const navigate=useNavigate()
    // const inputRef=useRef()
    const putRecipe=async()=>{
        try{
        const response=await axios.post("http://localhost:3030/recipes",
           {"directions":direct,
            "ingredients":ingred,
            "title":title,
            "img":img
           }
         )
         alert("Recipe added successfuly")
        }
        catch(error){
            console.error(error);
        }
    }
    const handleNav=(()=>{
        navigate('/')
    }) 

    // console.log(img)
    return(
        <>
        <h1 id="give-recipe">Give Recipe</h1>
        <label className="label" for="name">Title: </label>
        <br></br>
            <input placeholder="Title" className="input" type="text" name="title" onChange={(event)=>setTitle(event.target.value)}/>
            <br></br>
            <br></br>
            <label className="label" for="ingredients">Ingredients: </label>
            <br></br>
            <input placeholder="Ingredients" className="input" type="text" name="ingredients" onChange={(event)=>setIngred(event.target.value)}/>
            <br></br>
            <br></br>
            <label className="label" for="directions">Directions: </label>
            <br></br>
            <input placeholder="Directions" className="input" type="text" name="directions" onChange={(event)=>setDirect(event.target.value)}/>
            <br></br>
            <br></br>
            <label  className="label" for="image">Image</label>
            <br></br>
            <input placeholder="Image" className="input" type="text" onChange={(event)=>setImg(event.target.value)}/>
            {/* <img src={img} alt="Nothing to dsplay"/> */}
            <br></br>
            <br></br>
            <button className="add-recipe" onClick={()=>{putRecipe();handleNav()}}>Add Recipe</button>
        </>
    )
}
export default InputRecipe;