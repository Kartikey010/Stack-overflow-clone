import React, { useEffect } from 'react'
import "./Askquestions.css"
import {useNavigate} from "react-router-dom"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { askquestion } from '../../actions/question'
import axios from "axios"

function AskQuestions() {
   const [questionTitle, setQuestionTitle] =useState("")
   const [questionBody, setQuestionBody] = useState("")
   const [questionTags, setQuestionTags] = useState("")
  // const [no,setno]=useState(10);
   
   const dispatch = useDispatch();
   const User = useSelector((state) =>(state.currentUserReducer))
    
   
//    useEffect(()=>{
//     const toshow=getcount();
//     setno(toshow);
//    })

//    const getcount=async()=>{
//     const email= User.result.email;
   
//     const validCount = await axios.post(`http://localhost:5000/getCount`,{email});
//     return validCount.data.count;
//    }
   //
  
   const subscription = useSelector(state => state.subscriptionReducer);
   //
   const navigate =useNavigate();
   

   const handleSubmit =async(e)=>{
    e.preventDefault();
    const email= User.result.email;
    console.log(email);
    const validCount = await axios.post(`https://stackoverflow-clone-ctpf.onrender.com/getCount`,{email});
    
    console.log(validCount+"from askquestion");
    
    if(validCount.data.count>0){
     
    
    console.log({questionTitle,questionBody,questionTags})
    console.log(subscription);
    dispatch(askquestion({questionTitle,questionBody,questionTags, userPosted: User.result.name,userId: User?.result?._id},navigate))
    console.log(User.result.email)
    //const email= User.result.email
    const countit = await axios.post(`https://stackoverflow-clone-ctpf.onrender.com/update`,{email});
    console.log(countit);
    
    }
    else if(validCount.data.count==-1){
        alert("Please purchase a plan before posting")
    }
    else{
        alert("you have reached your daily limit")
    }

     
   }
   const handleEnter=(e)=>{
    if(e.key==='Enter'){
        setQuestionBody(questionBody+'\n');
    }
   }

  return (
    <div className='ask-question'> 
     <div className='ask-ques-container'>
        <h1>Ask a Public Question</h1>
        <form onSubmit={handleSubmit}>
            <div className='ask-form-container'>
                <label htmlFor='ask-ques-title'>
                    <h4>Title</h4>
                    <p>Be specific and imagine you are asking a question to another person</p>
                    <input type="text" id="ask-ques-title"  placeholder='e.g is there an R function for finding the index of an element in a vector?'
                     onChange={(e)=>{setQuestionTitle(e.target.value)}}></input>
                </label>

                <label htmlFor='ask-ques-body'>
                    <h4>Body</h4>
                    <p>Include all the information someone would need to answer your question</p>
                    <textarea name='' id='ask-ques-body' cols="" row="" 
                    onChange={(e)=>{setQuestionBody(e.target.value)}} onKeyPress={handleEnter}></textarea>
                    {/* <input type="text" id="ask-ques-body"  ></input> */}
                </label>

                <label htmlFor='ask-ques-Tags'>
                    <h4>Tags</h4>
                    <p>Add up to 5 tags to describe what your question is about</p>
                    <input type="text" id="ask-ques-Tags"  placeholder='e.g (xml typescript wordpress)'
                    onChange={(e)=>{setQuestionTags(e.target.value.split(" "))}}></input>
                </label>
            </div>
            <input type="submit" value="Review your Question" className='review-btn'/>
        </form>

     </div>
    </div>
    
    
    )
}

export default AskQuestions