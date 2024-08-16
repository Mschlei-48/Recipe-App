import {useState} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import './home.css'
import api from './api.jsx'

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

    const [title,setTitle]=useState("")
    const [direct,setDirect]=useState("")
    const [ingred,setIngred]=useState("")
    const [img,setImg]=useState("")

    // Get the data from the API
    const getData=async ()=>{
        const response=await axios.get("http://localhost:3000/recipes")
        setData(response.data)
    }
    // Edit Data according to ID
    const editData=async()=>{
        try{
        const response=await axios.put(`http://localhost:3000/recipes/${editRow}`,
            {   "directions":direct,
                "ingredients":ingred,
                "title":title,
                "img":img
            }
        )
        alert("Updated recipe successfully")
    }
    catch(error){
        console.error("ERROR IS:",error)
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
    // Navigate to a new page
    const handleNav=((page)=>{   
        navigate(page)
    })
    // Filter Data according to the search term. If tehre is no search term just return the data as it is
    // Also to ensure that the search is not restricted by case sensitivity, we change everything to lower case before comparing
    // const filteredData = search ? data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : data;
    
    console.log(category)
    console.log(filteredData.length)
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
    

    const handleAddRecipe=(()=>{
        
    })
    // console.log(filteredData.length)
    // console.log(data)
    return(
        <div>
        <div className="nav-bar">
            <img src="./src/assets/Logo.png" className="logo"/>
            <button className="home-button" onClick={()=>navigate("/home")}>Home</button>
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
                    <label>Title:</label>
                    <input name="title" onChange={(event)=>setTitle(event.target.value)}/>
                    <br></br>
                    <label>Ingredients:</label>
                    <input name="ingred" onChange={(event)=>setIngred(event.target.value)}/>
                    <br></br>
                    <label>Directions:</label>
                    <input name="directions" onChange={(event)=>setDirect(event.target.value)}/>
                    <br></br>
                    <label>Image:</label>
                    <input name="image" onChange={(event)=>setImg(event.target.value)}/>
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
    <button id="Add-Button-home"><span>➕</span></button>
        </div>
        
    )
}
export default Home;