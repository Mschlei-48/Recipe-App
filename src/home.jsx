import {useState} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import './home.css'
import api from './api.jsx'
import Popup from 'reactjs-popup'

function Home(props){
    const [user,setUser]=useState(null)
    const [category,setCategory]=useState("All")
  

    const [page,setPage]=useState('/')
    useEffect(()=>{
        getData();
    })

    useEffect(()=>{
        handleCategories()
    })
 

    const [recipe,setRecipe]=useState([])
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const [search,setSearch]=useState("")
    const [editRow,setEditRow]=useState("")
    const [deleteRow,setDeleteRow]=useState("")
    const [edit,setEdit]=useState(false)
    const [filteredData,setFilteredData]=useState([])

    const [selCategory,setSelCategory]=useState("Select Categries")


    const [title,setTitle]=useState("")
    const [direct,setDirect]=useState("")
    const [ingred,setIngred]=useState("")
    const [img,setImg]=useState("")
    const [cat,setCat]=useState("")
    const [prep,setPrep]=useState()
    const [cook,setCook]=useState()
    const [serve,setServe]=useState()
    const [desc,setDesc]=useState("")
    // Get the data from the API
    const getData=async ()=>{
        const response=await axios.get("http://localhost:3000/recipes")
        setData(response.data)
    }
    // Edit Data according to ID
    const editData=async()=>{
        if(direct!=="" && ingred!=="" && title!==""){
        try{
        const response=await axios.put(`http://localhost:3000/recipes/${editRow}`,
            {   "directions":direct,
                "ingredients":ingred,
                "title":title,
                "img":img,
                "category":cat,
                "prep-time":prep,
                "cook-time":cook,
                "serving":serve,
                "description":desc
            }
        )
        alert("Updated recipe successfully")
        
    }
    catch(error){
        console.error("ERROR IS:",error)
    }
    }
    else{
        
        if(direct===""){
            alert("Please enter the directions")
        }
        else if(title===""){
            alert("Please enter the title")
        }
        else if(ingred===""){
            alert("Please enter the ingredients")
        }
        else if(img===""){
            alert("Please enter the ulr of the image")
        }

    }
    }



    
    // Delete a recipe
    const deleteData=async()=>{
        try{
            const response=await axios.delete(`http://localhost:3000/recipes/${deleteRow}`)
            alert("Recipe deleted successfully")
        }
        catch(error){
            console.error("Error is:",error)
        }
    }
    // Add a new recipe
    const putRecipe=async()=>{
        if(direct!=="" && ingred!=="" && title!==""){
            try{
                const response=await axios.post("http://localhost:3000/recipes",
                   {"directions":direct,
                    "ingredients":ingred,
                    "title":title,
                    "img":img,
                    "prep-time":prep,
                    "cook-time":cook,
                    "serving":serve,
                    "category":cat,
                    "description":desc
                   }
                 )
                //  console.log(response)
                 alert("Recipe added successfuly")
                 window.location.reload(true);
                }
                catch(error){
                    console.error(error);
                }
        }
        else{
            if(direct===""){
                alert("Please enter the directions")
            }
            else if(title===""){
                alert("Please enter the title")
            }
            else if(ingred===""){
                alert("Please enter the ingredients")
            }
            else if(img===""){
                alert("Please enter the ulr of the image")
            }
           
        }

    }


    // Navigate to a new page
    const handleNav=((page)=>{   
        navigate(page)
    })
    // Filter Data according to the search term. If tehre is no search term just return the data as it is
    // Also to ensure that the search is not restricted by case sensitivity, we change everything to lower case before comparing
    // const filteredData = search ? data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : data;
    

    const handleCategories = () => {
        let filtered = data;
    
        // Filter by category
        if (category !== "All") {
            filtered = filtered.filter(record => record.category.includes(category));
        }
    
        // Filter by search term
        if (search !== "") {
            filtered = filtered.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        }
    
        setFilteredData(filtered);
    };
    


    return(
        <div>
        <div className="nav-bar">
            <img src="./src/assets/Logo.png" className="logo"/>
            <button className="home-button" onClick={()=>navigate("/home")}>Home</button>
            <button className="profile-button" onClick={()=>navigate("/profile")}>Profile</button>
            <button className="logout-button" onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("refreshToken");navigate('/')}}>LogOut</button>
        </div>
        <div className="mid-content">
            <h3>Craving comfort? Heated Recipes<span className="emoji">🔥</span> is your go-to for warm, delicious meals. From hearty stews to cheesy bakes, our recipes will satisfy your cravings and leave you feeling cozy<span className="emoji">🍲</span>. Discover your new favorite dish today!<span className="emoji">🔥</span></h3>
        </div>
        <div className="categories">
            <button className="category" onClick={()=>setCategory("All")}>All</button>
            <button className="category" id="breakfast" onClick={()=>setCategory("Breakfast")}>Breakfast</button>
            <button className="category" id="lunch" onClick={()=>setCategory("Lunch")}>Lunch</button>
            <button className="category" id="dinner" onClick={()=>setCategory("Dinner")}>Dinner</button>
            <input id="search" type="text" placeholder="Search..." onChange={(event)=>setSearch(event.target.value)}></input>
        </div>


        <div className="main-content">
            {edit==true? (
                <div>
                    <input name="title" placeholder="Titles" clasName="edit-input" onChange={(event)=>setTitle(event.target.value)}/>
                    <br></br>
                    <br></br>
                   
                    <input name="ingred" placeholder="Ingredients" clasName="edit-input" onChange={(event)=>setIngred(event.target.value)}/>
                    <br></br>
                    <br></br>
                    
                   
                    <input name="directions" placeholder="Method" clasName="edit-input" onChange={(event)=>setDirect(event.target.value)}/>
                    <br></br>
                    <br></br>
                 

                    <input name="image" placeholder="Image URL" clasName="edit-input" onChange={(event)=>setImg(event.target.value)}/>
                    <br></br>
                    <br></br>
                    
                   
                    <input name="prep-time" placeholder="Prep Time" clasName="edit-input" onChange={(event)=>setPrep(event.target.value)}/>
                    <br></br>
                 
                    <br></br>
                    <input name="cook-time" placeholder="Cook Time" clasName="edit-input" onChange={(event)=>setCook(event.target.value)}/>
                    <br></br>
                    <br></br>
                    
                    <input name="serving" placeholder="Serving" clasName="edit-input" onChange={(event)=>setServe(event.target.value)}/>
                    <br></br>
                    <br></br>
                    
                    <input name="description" placeholder="Description" clasName="edit-input" onChange={(event)=>setDesc(event.target.value)}/>
                    <br></br>
                    <br></br>
                    
                    <div class="dropdown-edit">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        {selCategory}
        </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" onClick={()=>{setSelCategory("Breakfast");setCat("Breakfast")}}>Breakfast</a></li>
        <li><a class="dropdown-item" onClick={()=>{setSelCategory("Dinner");setCat("Dinner")}}>Dinner</a></li>
        <li><a class="dropdown-item" onClick={()=>{setSelCategory("Lunch");setCat("Lunch")}}>Lunch</a></li>
    </ul>
    </div>
    <br></br>
                    <button onClick={()=>{setEdit(false);editData()}}>Save Changes</button>
                    <button onClick={()=>{setEdit(false)}}>Cancel</button>
                </div>


            ):(
                
                filteredData.map((item) => (
            <div className="card" style={{width: "18rem"}} key={item.id}>
                    <img src={item.img} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description.slice(0,50)}...<a href="#" className="read-more" onClick={() => {handleNav('/recipe'); props.handleRecipe(item)}}>Read More</a></p>
                    <button className="action-buttons" onClick={()=>{setDeleteRow(item.id);deleteData()}}>Delete</button>
                    <button className="action-buttons"  id="edit-button" onClick={()=>{setEditRow(item.id);setEdit(true)}}>Edit</button>
                </div>
            </div>
                ))
                
                )}
    </div>
                
    <Popup trigger={<button id="Add-Button-home"><span>➕</span></button>} position="center">
    <div className="recipe-input-form">
    <input placeholder="Title" className="home-input" type="text" name="title" onChange={(event)=>setTitle(event.target.value)}/>
        <br></br>
        <br></br>
        <input placeholder="Ingredients" className="home-input" type="text" name="ingredients" onChange={(event)=>setIngred(event.target.value)}/>
        <br></br>
        <br></br>
        <input placeholder="Directions" className="home-input" type="text" name="directions" onChange={(event)=>setDirect(event.target.value)}/>
        <br></br>
        <br></br>
        <input placeholder="Image" className="home-input" type="text" onChange={(event)=>setImg(event.target.value)}/>
        <br></br>
        <br></br>
        <input placeholder="Prep Time" className="home-input" type="number" onChange={(event)=>setPrep(event.target.value)}/>
        <br></br>
        <br></br>
        <input placeholder="Cook Time" className="home-input" type="number" onChange={(event)=>setCook(event.target.value)}/>
        <br></br>
        <br></br>
        <input placeholder="Serving" className="home-input" type="number" onChange={()=>setServe(event.target.value)}/>
        <br></br>
        <br></br>
        <input placeholder="Description" className="home-input" type="text" onChange={(event)=>setDesc(event.target.value)}/>
        <br></br>
        <br></br>
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        {selCategory}
        </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" onClick={()=>{setSelCategory("Breakfast");setCat("Breakfast")}}>Breakfast</a></li>
        <li><a class="dropdown-item" onClick={()=>{setSelCategory("Dinner");setCat("Dinner")}}>Dinner</a></li>
        <li><a class="dropdown-item" onClick={()=>{setSelCategory("Lunch");setCat("Lunch")}}>Lunch</a></li>
    </ul>
    </div>
        <br></br>
        <br></br>
        <button className="add-recipe" onClick={()=>putRecipe()}>Add Recipe</button>
        <button onClick={()=>window.location.reload(true)}>Cancel</button>
        </div>
        </Popup>
    </div>
    
        
        
    )
}
export default Home;




    