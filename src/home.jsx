import {useState} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import './home.css'
import api from './api.jsx'

function Home(props){
    const [user,setUser]=useState(null)

    const [page,setPage]=useState('/')
    useEffect(()=>{
        getData();
    })

 

    const [recipe,setRecipe]=useState([])
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const [search,setSearch]=useState("")
    const [editRow,setEditRow]=useState("")
    const [deleteRow,setDeleteRow]=useState("")
    const [edit,setEdit]=useState(false)

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
        const response=await axios.put(`http://localhost:3030/recipes/${editRow}`,
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
            const response=await axios.delete(`http://localhost:3030/recipes/${deleteRow}`)
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
    const filteredData = search ? data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : data;

    return(
        <>
        <button onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("refreshToken");navigate('/')}}>LogOut</button>
        <input id="search" type="text" placeholder="Search..." onChange={(event)=>setSearch(event.target.value)}></input>
        <div className="nav-bar">
            <button className="nav-button" onClick={()=>navigate("/home")}>Home</button>
            <button className="nav-button" onClick={()=>navigate('/input')}>Give Recipe</button>
        </div>
        <div className="mid-content">
            <h3>Craving comfort? Heated Recipes<span className="emoji">🔥</span> is your go-to for warm, delicious meals. From hearty stews to cheesy bakes, our recipes will satisfy your cravings and leave you feeling cozy<span className="emoji">🍲</span>. Discover your new favorite dish today!<span className="emoji">🔥</span></h3>
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
                    <button onClick={()=>{setEdit(false);editData()}}>Cancel</button>
                </div>


            ):(
                filteredData.map((item) => (
  <div className="card-body">
  <img src={item.img} className="card-img-top" alt="..." />
    <h5 className="card-title">{item.title}</h5>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  
</div>
                ))
            )}



    </div>
       
        </>
    )
}
export default Home;