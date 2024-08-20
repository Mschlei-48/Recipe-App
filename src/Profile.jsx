import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import './Profile.css'

function Profile(props){
    const username=localStorage.getItem("token")
    const [profile,setProfile]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        getProfile()
    })

    const getProfile=async()=>{
        try{
            const response=await axios.get(`http://localhost:3001/credentials?username=${username}`)
            setProfile(response.data)
        }
        catch(error){
            console.error("Error getting data:",error)
        }
    }
    console.log(profile)
    return(
        <div>
            <div className="back-button-profile-container">
                <button className="back-button-profile" onClick={()=>navigate("/home")}><span id="back-arrow">← </span>Back</button>
            </div>
            <div className="profile-info">
                <span id="profile-pic">👤</span>
                <br></br>
                <br></br>
                <p>{profile[0].bio}</p>
                <br></br>
                <ul className='profile-list'>
                <li> 
                    <span className="emoji">🦰</span>
                        <span id="experience" className="headings">Full Name</span>
                        <p>{profile[0].name}</p>
                    </li>
                    <li><span className="emoji">📧</span>
                        <span className="headings">Username</span>
                        <p>{profile[0].username}</p>
                    </li>
                    <li><span className="emoji">🎂</span>
                        <span id="age" className="headings">Age</span>
                        <p id="Age-value">{profile[0].age}</p>
                        
                    </li>
                    <li><span className="emoji">♂</span>
                        <span id="gender" className="headings">Gender</span> 
                        <p>{profile[0].gender}</p>
                    </li>
                    <li><span className="emoji">💼</span>
                       <span id="profession" className="headings">Profession</span>
                        <p>{profile[0].profession}</p>
                        
                    </li>
                    <li> 
                    <span className="emoji">📞</span>
                        <span id="number" className="headings">Number</span>
                        <p>{profile[0].phoneNumber}</p>
                    </li>

                </ul>
                
                <br></br>
            </div>
        
        
        </div>

    )
}
export default Profile;