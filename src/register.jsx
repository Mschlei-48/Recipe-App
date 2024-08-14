import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


function Register(){

    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()
    const regData=async()=>{
        const email_pattern=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(email_pattern.test(username)===true && password.length>8){
            try{
                const response=await axios.post("http://localhost:3001/credentials",{
                    "username":username,
                    "password":password
                })
                const {token,refreshToken}=response.data
                localStorage.setItem("token",response.data.username)
                localStorage.setItem("refreshToken",response.data.password)
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
    return (
        <>
        <h1>RegisterPage</h1>
        <input type="email" placeholder="Email address" onChange={(event)=>setUsername(event.target.value)}/>
        <input type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
        <button onClick={()=>regData()}>Register</button>
        </>
    )

}
export default Register;