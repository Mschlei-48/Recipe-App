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
                
                <span className="headings"><span className="emoji">📧</span>Username :</span>
                <br></br>
                <span>{profile[0].username}</span>
                <br></br>
                <br></br>
                <span id="age" className="headings"><span className="emoji">🎂</span>Age:</span>
                <br></br>
                <span id="Age-value">{profile[0].age}</span>
                <br></br>
                <br></br>
                <span id="gender" className="headings"><span className="emoji">♂</span>Gender:</span>
                <br></br>
                <span>{profile[0].gender}</span>
                <br></br>
                <br></br>
                <span id="profession" className="headings"><span className="emoji">💼</span>Profession</span>
                <br></br>
                <span>{profile[0].profession}</span>
                <br></br>
                <br></br>
                <span id="number" className="headings"><span className="emoji">📞</span>Phone Number:</span>
                <br></br>
                <span>{profile[0].phoneNumber}</span>
               <br></br>
            </div>
        
        
        </div>

    )
}
export default Profile;