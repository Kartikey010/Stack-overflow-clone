import React from 'react'
import "./Askquestions.css"
import {useNavigate} from "react-router-dom"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { askquestion } from '../../actions/question'


function AskQuestions() {
   const [questionTitle, setQuestionTitle] =useState("")
   const [questionBody, setQuestionBody] = useState("")
   const [questionTags, setQuestionTags] = useState("")
   
   const dispatch = useDispatch();
   const User = useSelector((state) =>(state.currentUserReducer))
   const navigate =useNavigate();

   const handleSubmit =(e)=>{
    e.preventDefault();
    // console.log({questionTitle,questionBody,questionTags})
    dispatch(askquestion({questionTitle,questionBody,questionTags, userPosted: User.result.name,userId: User?.result?._id},navigate))

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