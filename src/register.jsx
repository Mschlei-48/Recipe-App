import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './register.css'

function Register(){

    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()
    const regData=async()=>{
        const email_pattern=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const response=await axios.get("http://localhost:3001/credentials")
        const dat=response.data.find((record)=>record.username===username)
        console.log(dat)
        if(dat!==undefined){
            alert("User already exists")
        }
        else if(dat===undefined){
            if(email_pattern.test(username)===true && password.length>8){
                try{
                    const response=await axios.post("http://localhost:3001/credentials",{
                        "username":username,
                        "password":password
                    })
                    const {token,refreshToken}=response.data
                    localStorage.setItem("token",username)
                    localStorage.setItem("refreshToken",password)
                    alert("Data Added successfully")
                    navigate('/home')
                }
                catch(error){
                    console.error("Error is:",error)
                }
            }
            else if(email_pattern.test(username)===false){
                alert("Please enter valid email address")
            }
            else if(password.length<=8){
                alert("Please enter password with more than 8 characters")
            }
        }
        


    }
    return (
        <div className="reg-content">
        <img src="./src/assets/Logo.png" className="reg-logo"/>
        <h1>Register</h1>
        <br></br>
        <input type="email" placeholder="Email address" onChange={(event)=>setUsername(event.target.value)}/>
        <br></br>
        <br></br>
        <input type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
        <br></br>
        <br></br>
        <button className="register-submit-button" onClick={()=>regData()}>Register</button>
        <p>Are you already a user? <a onClick={()=>navigate("/")}>Login</a></p>
        </div>
    )

}
export default Register;