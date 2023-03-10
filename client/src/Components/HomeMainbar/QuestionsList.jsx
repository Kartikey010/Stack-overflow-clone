import React from 'react'
import Questions from './Questions'


function QuestionsList({questionsList}) {
  return (
    <>{
            questionsList.map((question)=>(
                <Questions question={question} key={question}/> 
                
            ))
          
    }
    
    </>
  )
}

export default QuestionsList