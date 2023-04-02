import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSubscription } from '../../actions/setSubscription';

import "./PricingCard.css"
import axios from "axios";

const PricingCard = (props) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
    
     const [amount,setAmount]= useState(0);
    //  const [success100,setSuccess100]= useState(false);
    //  const [success1000,setSuccess1000] = useState(false);
    //  const [success,setSuccess] = useState(false);
     const User = useSelector((state)=>state.currentUserReducer)

  
     //useEffect(() => {
      // const isSuccess100 = localStorage.getItem("success100");
      // const isSuccess1000= localStorage.getItem("success1000");
      // const isSuccess = localStorage.getItem("success");

      // setSuccess100(isSuccess100);
      // setSuccess1000(isSuccess1000);
      // setSuccess(isSuccess);
      // if(isSuccess1000==="true"){
      //   setSuccess1000(true);
      //   setSuccess(false);
      //   setSuccess100(false);
      // }
      // else if(isSuccess100==="true"){
      //      setSuccess100(true);
      //      setSuccess1000(false);
      //      setSuccess(false);
      // }
      // else if(isSuccess==="true"){
      //   setSuccess(true);
      //   setSuccess100(false);
      //   setSuccess1000(false);
      // }
      //console.log(isSuccess);
      //if(props.Pricing==100){
      //   setSuccess100(isSuccess100);
      //   setSuccess1000(isSuccess1000);
      //   setSuccess(isSuccess);
      //   //setSuccess(isSuccess1000)
      // }
      // else if(props.Pricing==1000){
      //   setSuccess1000(isSuccess1000);
        
      // }
      // else{
      //   setSuccess(isSuccess);
      // }
    //}, []);

  const handlefree=async()=>{
    // localStorage.setItem("success1000",'false');
    // localStorage.setItem("success100","false");
    // localStorage.setItem("success","true");
    // setSuccess(true);
    const sendUser=User.result.email;
    const isAlready=await axios.post("https://stackoverflow-clone-ctpf.onrender.com/check/free",{sendUser});
    // alert(isAlready.data)
    console.log(isAlready.data)

    if(!isAlready.data){
    const discription ={
      user:User.result.email,
      plan: "Free plan",
      count:1
    };

    try {
       await axios.post("https://stackoverflow-clone-ctpf.onrender.com/Pricing",discription);
      alert("Your free plan added");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  else{
    alert("a plan already in use")
  } 
  }

  const handlebuy = async (event) => {
    event.preventDefault();
    
    const sendUser=User.result.email;
    const isAlready=await axios.post("https://stackoverflow-clone-ctpf.onrender.com/check/silver",{sendUser});
    const isAlreadyGold = await axios.post("https://stackoverflow-clone-ctpf.onrender.com/check/gold",{sendUser})
    // alert(isAlready.data)
    console.log("isAlredy->>"+isAlready.data);
    console.log("isAlreadyGold-->"+isAlreadyGold.data);
    
    if(props.Pricing===100){
       if(isAlready.data){
        alert("an active plan")
       }
       else{
       
    setAmount(props.Pricing*100);
    console.log({"amount":amount});
    const response = await axios.post("https://stackoverflow-clone-ctpf.onrender.com/createOrder", {amount});
    const { data } = response;
    const options = {
      key: "rzp_test_W6zxbHOBPc2J98",
      amount: data.amount,
      currency: "INR",
      name: "StackOverflow",
      description: "Subscription Payment",
      order_id: data.id,
      handler: async function (response) {
        // handle payment success
        //if(props.Pricing===100){
        // localStorage.setItem("success100",'true');
        // localStorage.setItem("success1000","false");
        // localStorage.setItem("success","false");
        //setSuccess100(true);
        dispatch(setSubscription('silver', 100, new Date()));
        
       
        const discription ={
          user:User.result.email,
          plan: "Silver",
          count:10
        };
         
        try {
         
          await axios.post("https://stackoverflow-clone-ctpf.onrender.com/Pricing",discription);
          //await axios.post("http://localhost:5000/deleteSubscription",{User_to_delete})
          alert("Your silver plan added");
          navigate("/");
        } catch (error) {
          console.log(error);
        }

        /*}
        else if(props.Pricing===1000){
          // localStorage.setItem("success1000",'true');
          // localStorage.setItem("success100","false");
          // localStorage.setItem("success","false");
          // setSuccess1000(true);
          dispatch(setSubscription('gold', 1000, new Date()));

          const discription ={
            user:User.result.email,
            plan:"Gold",
            count: `${2 * Number.MAX_VALUE}`,/*infinity*/
        // };
        //   try {
        //     await axios.post("http://localhost:5000/Pricing",discription);
        //     alert("Your gold plan added");
        //     navigate("/");
        //   } catch (error) {
        //     console.log(error);
        //   }
        // }
        
        

      },
      prefill: {
        name: "Tester",
        email: "tester@example.com",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

  }
} else if(props.Pricing===1000){
  if(isAlreadyGold.data){
    alert("an active plan gold")
   }
   else{
   
setAmount(props.Pricing*100);
console.log({"amount":amount});
const response = await axios.post("https://stackoverflow-clone-ctpf.onrender.com/createOrder", {amount});
const { data } = response;
const options = {
  key: "rzp_test_W6zxbHOBPc2J98",
  amount: data.amount,
  currency: "INR",
  name: "StackOverflow",
  description: "Subscription Payment",
  order_id: data.id,
  handler: async function (response) {
    // handle payment success
   
    
      // localStorage.setItem("success1000",'true');
      // localStorage.setItem("success100","false");
      // localStorage.setItem("success","false");
      // setSuccess1000(true);
      // dispatch(setSubscription('gold', 1000, new Date()));

      const discription ={
        user:User.result.email,
        plan:"Gold",
        count: `${2 * Number.MAX_VALUE}`,/*infinity*/
    };
      try {
        await axios.post("https://stackoverflow-clone-ctpf.onrender.com/Pricing",discription);
        alert("Your gold plan added");
        navigate("/");
      } catch (error) {
        console.log(error);
      }

  },
  prefill: {
    name: "Tester",
    email: "tester@example.com",
  },
};
const rzp1 = new window.Razorpay(options);
rzp1.open();

}
}
  
  };

    // const handlebuy=()=>{
    //   if(props.Pricing=="100"){
    //     setAmount(10000);
    //   }
    //   else if(props.Pricing=='1000') {
    //     setAmount(100000);
    //   }
    //   else{
    //     alert("hooohoooo you get it for free");
    //   }
    // }
  return (
    <>
    {/* {!(props.Pricing===100?success100:(props.Pricing===0?success:success1000))?( */}
    <div className="pricingCard" style={{backgroundColor:"#b1ab9a12"}}>
    <div className='image-div' style={{backgroundColor:props.color}}>
        <img src={props.image} alt=""/>
        
      </div>
      <div className='border'></div>  
      <div className='pricing-content'>
        <h2>{props.Pricing===0?"":props.Pricing}{props.Pricing===0?"Free plan":"rs/month"}</h2>
        <p>{props.content}</p>
        <button className="pricing-btn" onClick={props.Pricing?handlebuy:handlefree}>GET</button>
      </div>
     </div>
     {/* </div>):(
      <div className='pricingCard success'>
       <p className='rotate'> Purchased</p>
      </div>  */}

    </>
    
     
    
  )
}

export default PricingCard