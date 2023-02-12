import {createContext, useState, useEffect} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authToken, setAuthToken] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)
    let [user,setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null)
    let [loading,setLoading] = useState(true)

    const tokenAPI = axios.create({
        baseURL:"http://52.220.90.9:8000/",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const navigate = useNavigate()

    let loginUser = async (e) => {
        const payload = JSON.stringify({"username": e.username , "password": e.password})
        try {
            let response = await tokenAPI.post("/token/",  payload)
            console.log(response)
            if (response.status === 200) {
                setAuthToken(response.data)
                setUser(jwt_decode(response.data.access))
                localStorage.setItem("authTokens", JSON.stringify(response.data))
                navigate("/")
            }
        } catch {
            alert("Wrong password/user combination")
        }
    }


    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/login")
    }

    let updateToken = async () => {
        if (authToken) {
            console.log(authToken)
            const payload = JSON.stringify({"refresh" : authToken.refresh})
            console.log(payload)
            let response = await tokenAPI.post("/token/refresh/",  payload)
            if (response.status === 200) {
                setAuthToken(response.data)
                setUser(jwt_decode(response.data.access))
                localStorage.setItem("authTokens", JSON.stringify(response.data))
            } else {
                logoutUser()
            }
        }
        if (loading) {
            setLoading(false)
        }

    }

    useEffect(() => { 

        if (loading) {
            updateToken()
        }

        let fourMins = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (authToken) {
                updateToken()
            }
        }, fourMins)
        return () =>  clearInterval(interval)

    },[authToken,loading])

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}
