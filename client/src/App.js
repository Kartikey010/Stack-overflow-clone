// import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router} from 'react-router-dom';
import AllRoutes from './AllRoutes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import Chattbot1 from './Components/Chatbot/Chattbot1.js';
import Wrapotp from './Components/Wrapotp.js';

import Botphoto from "./assets/chatbot-img.svg"
import "./Components/Chatbot/Chatgpt.css"

function App() {
  const dispatch = useDispatch();

  ///
  const [toggle,setToggle]= useState(false);

    const handleToggle=()=>{
        if(toggle)setToggle(false);
        else setToggle(true);
    }
  ///
  
  useEffect(()=>{
   dispatch(fetchAllQuestions())
   dispatch(fetchAllUsers())
  },[dispatch])

  return (
    <div className="App">
      <Router>
      <Navbar/>
      
     
      <AllRoutes/>
      {toggle && <Wrapotp/>}
      <img src={Botphoto} className='chatbot-avatar' onClick={handleToggle}/>
      </Router>
      
    </div>
  );
}

export default App;
