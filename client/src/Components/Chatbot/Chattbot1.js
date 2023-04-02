//WE ACTUALLY DIDN'T USED THIS FILE ANYWHERE BUT THIS CODE DEPICTS THE CODE FOR CHATBOT ONLY
//*****************************************************************************************
import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
//import  messageReducer  from './reducers/messageReducer.js';
import "./Chatgpt.css"
import Send from "../../assets/paperplane.svg"

import Otp from "../Otp.js"

const ADD_MESSAGE = 'ADD_MESSAGE';

// function messageReducer(state = [], action) {
//   switch (action.type) {
//     case ADD_MESSAGE:
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// }


function Chattbot1() {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messageReducer);
  const [prompt, setPrompt] = useState('');
  const [typing,setTyping] = useState(false);


  function handleInput(event) {
    setPrompt(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(prompt);
    setPrompt('');
    setTyping(true);
    // Add user message to store
    dispatch({ type: ADD_MESSAGE, payload: { text: prompt, isUser: true } });

    // Call API with input and get response
    try {
      const response = await axios.post('https://stackoverflow-clone-ctpf.onrender.com/chat', { prompt });
      setTyping(false);
      console.log(response.data);

      // Add bot message to store
      dispatch({ type: ADD_MESSAGE, payload: { text: response.data, isUser: false } });
    } catch (error) {
      console.error(error);
    }

    //setPrompt('');
  }

  return (
    <div className="chatbot">
     <div className="chat-window">
      <div className='stackbot'>Stackbot</div>
        {messages.map((message, index) => (
          <div className={message.isUser ? 'user-message' : 'bot-message'} key={index}>
            { message.text
            }
          </div>  
        ))}
      </div>
     
      {(typing)?(
        <div className='bot-message typing'>Typing...</div>
      ):""}
      <form className="input-form" onSubmit={handleSubmit}>
        <input className='input' type="text" value={prompt} onChange={handleInput} />
        <button type="submit"><img src={Send} alt="Send" /></button>
      </form>

      <Otp/>
    </div>
  );
}

export default Chattbot1;
