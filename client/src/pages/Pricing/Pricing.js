import React from 'react'
import PricingCard from './PricingCard.js'
import "./PricingCard.css"
import Bronze from "../../assets/bronze-medal.svg"
import Gold from "../../assets/gold-medal.svg"
import Silver from "../../assets/silver-medal.svg"

const Pricing = () => {
  return (
    <div>
    <div className='pricing-heading'>Stack Overflow for<br/> Teams Pricing and Plans</div>
    <div className='pricing'>
        <PricingCard image={Bronze} Pricing={0} content="You can post 1 question per day" color="bronze"/>
        <PricingCard image={Silver} Pricing={100} content="You can post 10 questions per day" color="silver"/>
        <PricingCard image={Gold} Pricing={1000} content="You can post unlimited questions" color="gold"/>
    </div>
    </div>
  )
}

export default Pricing