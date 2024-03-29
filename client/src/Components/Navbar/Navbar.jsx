import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import logo from "../../assets/logo.png"
import search from "../../assets/search.svg"
import "../../Components/Navbar/Navbar.css"
import Avatar from "../../Components/Avatar/Avatar"
// import Button from "../../Components/Button/Button"
import "./Navbar.css"
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { setCurrentUser } from '../../actions/currentUser'
import decode from "jwt-decode"

function Navbar() {
    var User =useSelector((state)=>(state.currentUserReducer))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout =()=>{
      dispatch({type: 'LOGOUT'});
      navigate('/')
      dispatch(setCurrentUser(null))
    }

    useEffect(()=>{
     const token = User?.token
     if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp*1000 < new Date().getTime()){//exp refers to expiry time
           handleLogout()
      }
     }

      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[dispatch]);

  return (
    <nav className='main-nav'>
    <div className='navbar'>
        <Link to="/" className="nav-item nav-logo">
            <img src={logo}  alt ="logo" height="28px"/>
        </Link>
        <Link to="/" className="nav-item nav-btn">About</Link>
        <Link to="/" className="nav-item nav-btn">Products</Link>
        <Link to="/" className="nav-item nav-btn">For Teams</Link>
        <Link to='/Pricing' className='nav-item nav-btn'>Pricing</Link>
        <form>
            <input type="text" placeholder='Search..' />
            <img src={search} alt="search" width="18" className="search-icon"/>
        </form>
        {User===null?
           <Link to="/Auth" className="nav-item nav-links">Log in</Link>
           :
           <>
            <Avatar
            backgroundColor="#009dff" px="10px" py="7px" borderRadius="50%" color=""
            ><Link to={`/Users/${User?.result?._id}`} style={{color:"white",textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
            <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
           </>
        
        }
        
    </div>

    </nav>

  )
}

export default Navbar