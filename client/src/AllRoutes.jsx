import React from 'react'
import {Routes ,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
import Questions from './pages/Questions/Questions'
import AskQuestions from './pages/AskQuestions/AskQuestions'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import Pricing from './pages/Pricing/Pricing.js'

const  AllRoutes=()=> {
  return (
    
    
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/Auth" element={<Auth/>} />
        <Route  path="/Questions" element={<Questions/>} />
        <Route path='/AskQuestions' element={<AskQuestions/>} />
        <Route path="/Questions/:id" element={<DisplayQuestion />} />
        <Route path="/Tags" element={<Tags/>} />
        <Route path="/Users" element={<Users/>}/>
        <Route path="/Users/:id" element={<UserProfile/>}/>
        <Route path="/Pricing" element={<Pricing/>}/>
      </Routes>
    
    
  );
}

export default AllRoutes