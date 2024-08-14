import axios from 'axios'
import {useNavigate} from 'react'


const api=axios.create({
    baseURL:"/api",
});
// const navigate=useNavigate()
api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token");
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
            return config;
    },
    (error)=>Promise.reject(error)
);

api.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const originalRequest=error.config;
        if(error.response.status===401 && !originalRequest._retry){
            originalRequest._retry=true
            try{
                const refreshToken=localStorage.getItem("refreshToken");
                const response=await axios.post("http://localhost:5173/refresh-token",{refreshToken});
                const {token}=response.data
                localStorage.setItem("token",token);

                originalRequest.headers.Authorization=`Bearer ${token}`;
                return axios(originalRequest);
            }
            catch(error){
                const navigate=useNavigate()
                navigate('/')
            }
        }
    }
)

export default api;