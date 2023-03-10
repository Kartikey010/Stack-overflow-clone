import * as api from "../api"
import { setCurrentUser } from "./currentUser"


export const signup=(authData, navigate) => async (dispatch)=>{
    try{
        const {data} = await api.signUp(authData)
        dispatch({ type: "AUTH", data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate("/")
    }
    catch(error){
       console.log(error)
    alert("User already exist ")
    }
}

export const login =(authData, navigate) => async (dispatch)=>{
    try{
        const {data} = await api.logIn(authData)
        dispatch({ type: "AUTH", data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate("/")
    }
    catch(error){
       console.log(error)
       alert("Please sign up before login")
    }
}