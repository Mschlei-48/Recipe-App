import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useEffect} from 'react'
import api from "./api.jsx"
// import { Redirect } from 'react-router-dom';

function Login(props){
    const navigate=useNavigate()
    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const [usernames,setUsernames]=useState([])
    const [passwords,setPasswords]=useState([])
    const [isAuth,setIsAuth]=useState(false)

    const handleLocalStorageAuth=(()=>{
        // return props.handleLocalStorageAuth
    })

    useEffect(() => {
        const token = localStorage.getItem('token') || localStorage.getItem('refreshToken');
        if (token) {
              console.log('User authenticated with existing token.');
              setIsAuth(true)
            }
      });
        const getData=async()=>{
            try{
                const response=await axios.get("http://localhost:3001/credentials")
                // alert("Data Fetched Successfully")
               const dat=response.data.find((record)=>record.username===username)
               localStorage.setItem("token",dat.username)
               localStorage.setItem("refreshToken",dat.password)
               if(dat!==undefined && dat.password===password){
                    navigate('/home')
               }
               else if(dat!==undefined && dat.password!==password){
                alert("Please enter correct password")
               }
               else if(dat===undefined){
                alert("User does not exist,please click the register button below to register")
               }
                    
            }
            catch(error){
                console.error("Error:",error)
            }

        }
        if (isAuth) {
            navigate("/home");
          }
    
    return(
        <div>
        <h1>Login Page</h1>
        <div>
            <input placeholder="Email address" onChange={(event)=>setUsername(event.target.value)}/>
            <br></br>
            <br></br>
            <input placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
        </div>
        <br></br>
        <br></br>
        <button onClick={()=>getData()}>Login</button>
        <button onClick={()=>navigate('/register')}>Not registered? Click here.</button>
        </div>
    )
}
export default Login;