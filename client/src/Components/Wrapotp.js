
import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
//import  messageReducer  from './reducers/messageReducer.js';
import "./Chatbot/Chatgpt.css"
import Send from "../assets/paperplane.svg"


const ADD_MESSAGE = 'ADD_MESSAGE';

const Wrapotp = () => {
   
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');
  const [isVerified,setIsverified] =useState(false);


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
  
  ////////////
  useEffect(() => {
    const verified = localStorage.getItem('isVerified');
    if (verified === 'true') {
      setIsverified(true);
    }
  }, []);
  

    
  const handleSubmit1 = async (event) => {
    event.preventDefault();

    // Send the email to the server
    const response = await fetch('https://stackoverflow-clone-ctpf.onrender.com/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setStatus(data.message);
  };

  const handleVerification = async (event) => {
    event.preventDefault();
    // Verify the OTP
    const response = await fetch('https://stackoverflow-clone-ctpf.onrender.com/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    setStatus(data.message);
    if(data.message.includes("verified")){
        //setIsverified(true);
        localStorage.setItem('isVerified', 'true');
      
    }
  };
  return (
    <div>

    {
        (!isVerified)?(
            <div className='wrapotp'>
            <div><h5>Authenticate before accesing chatbot</h5></div>
            <form onSubmit={handleSubmit1}>
        <label>
          Email:
          <input type="email" className='otp-input' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit">Send OTP</button>
      </form>
      <form onSubmit={handleVerification}>
        <label>
          OTP:
          <input className='otp-input1' type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </label>
        <button type="submit">Verify OTP</button>
        {status && <p>{status}</p>}
      </form>
      </div>
        ):(
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

    </div>
        )
    }

    </div>
  )
}

export default Wrapotp